const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Audit"

exports.handler = async (event) => {
    console.log(event);

    return {
        event
    }
};