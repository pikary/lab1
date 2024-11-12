// const WeatherService = require('weatherapi_layer/index'); // Adjust the path as needed
const WeatherService = require('weatherapi_layer'); 

exports.handler = async (event) => {
    try {
        const weatherService = new WeatherService();
     
        const { latitude = 52.52, longitude = 13.405 } = event.queryStringParameters || {}
        const forecast = await weatherService.getWeatherForecast(latitude, longitude);
        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(forecast),
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
