exports.handler = async (event) => {
    const { httpMethod, path } = event;

    if (httpMethod === 'GET' && path === '/hello') {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello from Lambda'
            }),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${httpMethod}`
        }),
    };
};
