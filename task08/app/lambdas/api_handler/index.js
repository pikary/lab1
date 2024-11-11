const axios = require('axios')

exports.handler = async (event) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m', {
        });
        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.log(error);

        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
