exports.handler = async (event) => {
    const path = event.rawPath;
    const method = event.requestContext.http.method;
    
    // Logging the event and route info for debugging
    console.log(event);
    console.log('HELLOOO');
    
    if (path === '/hello') {
        console.log('HELLO THIS IS HELLO ROUTE');
        
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                statusCode: 200,
                message: 'Hello from Lambda'
            })
        };
    }

    // Return a 400 error for any other request
    return {
        statusCode: 400,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
        })
    };
};
