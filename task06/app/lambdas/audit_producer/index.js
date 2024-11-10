const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const AUDIT_TABLE = "cmtr-77278c6b-Audit-test";

exports.handler = async (event) => {
    for (const record of event.Records) {
        const { eventName, dynamodb: dbRecord } = record;
        const itemKey = dbRecord.Keys.key.S;

        if (eventName === "INSERT") {
            const newValue = AWS.DynamoDB.Converter.unmarshall(dbRecord.NewImage);
            const auditEntry = {
                id: uuid.v4(),
                itemKey,
                modificationTime: new Date().toISOString(),
                newValue
            };
            await dynamodb.put({ TableName: AUDIT_TABLE, Item: auditEntry }).promise();
        } else if (eventName === "MODIFY") {
            const oldImage = AWS.DynamoDB.Converter.unmarshall(dbRecord.OldImage);
            const newImage = AWS.DynamoDB.Converter.unmarshall(dbRecord.NewImage);
            const updatedAttribute = Object.keys(newImage).find(key => newImage[key] !== oldImage[key]);

            const auditEntry = {
                id: uuid.v4(),
                itemKey,
                modificationTime: new Date().toISOString(),
                updatedAttribute,
                oldValue: oldImage[updatedAttribute],
                newValue: newImage[updatedAttribute]
            };
            await dynamodb.put({ TableName: AUDIT_TABLE, Item: auditEntry }).promise();
        }
    }
};
