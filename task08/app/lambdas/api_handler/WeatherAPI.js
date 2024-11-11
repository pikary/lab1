const axios = require('axios');

class WheatherAPI {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13';
    }

    async getWeatherForecast(latitude, longitude) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: 'temperature_2m',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            throw new Error('Could not fetch weather forecast');
        }
    }
}
