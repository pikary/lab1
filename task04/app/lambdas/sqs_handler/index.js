// Lambda handler to process SQS messages and log content to CloudWatch Logs
exports.handler = async (event) => {
    // Log the entire event for reference
    console.log("Received event:", JSON.stringify(event, null, 2));

    // Loop through each record (SQS message) in the event
    for (const record of event.Records) {
        // Extract the message body
        const messageBody = record.body;
        // Log the message content to CloudWatch
        console.log("Message Body:", messageBody);
    }

    // Return a success message
    return {
        statusCode: 200,
        body: JSON.stringify('Messages processed successfully'),
    };
};
