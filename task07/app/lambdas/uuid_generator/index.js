const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
    const ids = []
    for (let i = 0; i < 10; i++) {
        ids.push(uuidv4())
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
        Bucket: 'uuid-storage',
        Key: fileName,
        Body: fileContent,
        ContentType: "application/json"
    };

    s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Upload Success", data.Location);
        }
    })
};
