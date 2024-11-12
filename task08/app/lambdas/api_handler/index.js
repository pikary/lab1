const WeatherService = require('weatherservice'); // Adjust the path as needed
// const WeatherService = require('/var/task/lambdas/api_handler/index.js'); 

exports.handler = async (event) => {
    try {
        console.log(WeatherService);
        
        const weatherService = new WeatherService();
     
        const forecast = await weatherService.getWeatherForecast();
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
