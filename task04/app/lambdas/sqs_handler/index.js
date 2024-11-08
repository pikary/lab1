exports.handler = async (event) => {
    console.log('Hello world!!!!');
    
    // Return a success message
    return {
        statusCode: 200,
        body: JSON.stringify('Messages processed successfully'),
    };
};
