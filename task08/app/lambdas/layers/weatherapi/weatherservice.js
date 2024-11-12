const axios = require('axios');

class WeatherService {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';
    }

    async getWeatherForecast() {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            throw new Error('Could not fetch weather forecast');
        }
    }
}

module.exports = WeatherService;
