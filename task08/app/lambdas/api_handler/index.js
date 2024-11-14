const moment = require('moment')
const WeatherAPI = require('your-layer-name')

exports.handler = async (event) => {
    try {
        const weatherApiInstance = new WeatherAPI()
        const result = await weatherApiInstance.getWeather()
        return  JSON.stringify(result)

    } catch (e) {
        console.log(e);

    }
};
