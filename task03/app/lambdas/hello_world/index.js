exports.handler = async (event) => {
    // TODO implement
    return {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            statusCode: 200,
            message: 'Hello from Lambda'
        })
    };
};
