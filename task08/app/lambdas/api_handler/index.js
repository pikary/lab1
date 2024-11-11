const WeatherService = require('./WeatherService'); // Assuming the class is in a separate file

exports.handler = async (event) => {
    const weatherService = new WeatherService();

    // Extract latitude and longitude from the event object or use defaults
    const { latitude = 52.52, longitude = 13.405 } = event.queryStringParameters || {};

    try {
        const forecast = await weatherService.getWeatherForecast(latitude, longitude);

        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(forecast),
        };
    } catch (error) {
        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
