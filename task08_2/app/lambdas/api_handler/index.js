const { testvar } = require('weather-service/test.js'); 



exports.handler = async (event) => {
    // TODO implement
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! ' + testvar),
    };
    return response;
};
