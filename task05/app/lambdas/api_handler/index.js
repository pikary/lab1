const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "cmtr-77278c6b-Events-test";

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };
    console.log(event);


    // const requestJSON = JSON.parse(event.input.body);
    const newEvent = {
        id: uuidv4(),
        principalId: event.principalId,
        createdAt: new Date().toISOString(),
        body: event.content,
    };

    await dynamo.send(
        new PutCommand({
            TableName: tableName,
            Item: newEvent,
        })
    );

    statusCode = 201;

    return {
        statusCode,
        event: newEvent,
    };



};