// Lambda handler to process SNS messages and log their content to CloudWatch Logs
exports.handler = async (event) => {
    // Log the entire event for reference
    console.log("Received event:", JSON.stringify(event, null, 2));

    // Loop through each record (SNS message) in the event
    for (const record of event.Records) {
        // Extract the SNS message
        const snsMessage = record.Sns.Message;
        // Log the message content to CloudWatch
        console.log("SNS Message Content:", snsMessage);
    }

    // Return a success message
    return {
        statusCode: 200,
        body: JSON.stringify('SNS messages processed successfully'),
    };
};
