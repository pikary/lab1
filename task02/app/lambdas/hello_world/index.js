exports.handler = async (event) => {

    const path = event.rawPath
    const method = event.requestContext.http.method
    // Handle the /hello GET request
    console.log(event);
    
    console.log('HELLOOO');
    
    if (event.rawPath == '/hello') {
        console.log('HELLO THIS IS HELLO ROUTE');
        
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
        message: `Bad request syntax or unsupported method. Request path: ${event.rawPath}. HTTP method: ${event.requestContext.http.method}`
    }
};
