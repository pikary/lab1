exports.handler = async (event) => {

    const path = event.rawPath
    const method = event.requestContext.http.method
    // Handle the /hello GET request
    console.log(event);
    
    if (path === '/hello') {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            message: 'Hello from Lambda'
        }
    }

    // Return a 400 error for any other request
    return {
        statusCode: 400,
        headers: {
            "Content-Type": "application/json"
        },
        message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
    }
};
