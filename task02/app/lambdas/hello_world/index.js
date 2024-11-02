exports.handler = async (event) => {
    const { httpMethod, path } = event;

    // Handle the /hello GET request
    if (httpMethod === 'GET' && path === '/hello') {
        return {
            statusCode: 200,
            body: JSON.stringify({
                statusCode: 200,
                message: 'Hello from Lambda'
            })
        };
    }

    // Return a 400 error for any other request
    return {
        statusCode: 400,
        body: JSON.stringify({
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${httpMethod}`
        })
    };
};
