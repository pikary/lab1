const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
    try {
        const ids = [];
        for (let i = 0; i < 10; i++) {
            ids.push(uuidv4());
        }
        
        const s3 = new AWS.S3();
        const timestamp = new Date().toISOString();
        const fileName = `uuids-${timestamp}.json`;

        // Prepare file content
        const fileContent = JSON.stringify({
            generatedAt: timestamp,
            uuids: ids
        });

        const params = {
            Bucket: process.env.target_bucket || 'uuid-storage',
            Key: fileName,
            Body: fileContent,
            ContentType: "application/json"
        };

        // Await the upload to ensure it completes before the function exits
        const data = await s3.upload(params).promise();
        console.log("Upload Success", data.Location);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "UUIDs successfully uploaded.", location: data.Location })
        };
    } catch (error) {
        console.error("Error uploading to S3:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to upload UUIDs.", error: error.message })
        };
    }
};
