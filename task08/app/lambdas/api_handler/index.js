const moment = require('moment')
const WeatherAPI = require('nurlan')

exports.handler = async (event) => {
    try{
        const weatherApiInstance = new WeatherAPI()
        const result =await weatherApiInstance.getWeather()
        return {
            body: JSON.stringify(result)
        }
    }catch(e){
        console.log(e);
        
    }
};
