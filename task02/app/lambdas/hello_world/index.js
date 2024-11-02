exports.handler = async (event) => {

    const path = event.rawPath
    const method = event.requestContext.http.method
    // Handle the /hello GET request
    console.log(event);
    
    if (path === '/hello') {
        return JSON.parse({
            statusCode: 200,
            message: 'Hello from Lambda'
        });
    }

    // Return a 400 error for any other request
    return JSON.parse({
        statusCode: 400,
        message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
    });
};
