exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        const messageBody = record.body;
        console.log("Message Body:", messageBody);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Messages processed successfully'),
    };
};
