const axios = require('axios')

module.exports = class WeatherAPI{
    baseUrl
    constructor(){
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
    }
    async getWeather(){
        const result = await axios.get(this.baseUrl)
        return result.data
    }

}