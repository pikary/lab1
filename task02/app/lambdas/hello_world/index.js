exports.handler = async (event) => {

    const path = event.rawPath
    const method = event.requestContext.http.method
    // Handle the /hello GET request
    return {
        statusCode: 200,
        message: 'Hello from Lambda',
        method:method,
        path:path,
        ev: event
    }
    if (method === 'GET' && path === '/hello') {
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
