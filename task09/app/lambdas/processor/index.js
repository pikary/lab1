const axios = require('axios')
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.target_table || 'Weather';

exports.handler = async (event) => {
    // TODO implement
    try {
        const result = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m')
        const filteredData = {
            elevation: result.data.elevation,
            generationtime_ms: result.data.generationtime_ms,
            hourly: {
                temperature_2m: result.data.hourly.temperature_2m,
                time: result.data.hourly.time,
            },
            hourly_units: {
                temperature_2m: result.data.hourly_units.temperature_2m,
                time: result.data.hourly_units.time,
            },
            latitude: result.data.latitude,
            longitude: result.data.longitude,
            timezone: result.data.timezone,
            timezone_abbreviation: result.data.timezone_abbreviation,
            utc_offset_seconds: result.data.utc_offset_seconds
        };
        const newEntity = {
            id: uuid.v4(),
            forecast: filteredData
        }

        const params = {
            TableName: TABLE_NAME,
            Item: newEntity
        };

        await dynamodb.put(params).promise();

        const response = {
            headers: {
                "Content-type": "application/json"
            },
            statusCode: 200,
            body: newEntity
        };
        return JSON.stringify(response);
    } catch (e) {
        console.error('Error:', e);

        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to fetch data or save to DynamoDB', error: e.message }),
        };
    }

};
