const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    region: process.env.region
});

exports.handler = async (event) => {
    const userPoolId = process.env.CUPId;
    const clientId = process.env.CUPClientId;

    // Parse the request body
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body" })
        };
    }

    // Handle `/signup` endpoint
    if (event.resource === '/signup' && event.httpMethod === 'POST') {
        const { email, password, firstName, lastName } = body;
        const params = {
            UserPoolId: userPoolId,
            Username: email,
            TemporaryPassword: password,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'firstname', Value: firstName },
                { Name: 'lastname', Value: lastName }
            ]
        };

        try {
            await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
            return {
                statusCode: 201,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "User created successfully" })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Signup failed", details: error.message })
            };
        }
    }

    // Handle `/signin` endpoint
    if (event.resource === '/signin' && event.httpMethod === 'POST') {
        const { email, password } = body;
        const params = {
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            UserPoolId: userPoolId,
            ClientId: clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        };

        try {
            const data = await cognitoIdentityServiceProvider.adminInitiateAuth(params).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: data.AuthenticationResult.IdToken })
            };
        } catch (error) {
            return {
                statusCode: 401,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Authentication failed", details: error.message })
            };
        }
    }

    // Handle `/tables` resource
    if (event.resource === '/tables' && event.httpMethod === 'GET') {
        // Your logic to fetch and return table data from DynamoDB
        // Example response (replace with actual DynamoDB integration):
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tables: [] })
        };
    }

    if (event.resource === '/tables' && event.httpMethod === 'POST') {
        const { tableData } = body;
        // Your logic to insert table data into DynamoDB
        // Example response (replace with actual DynamoDB integration):
        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Table data added successfully" })
        };
    }

    // Handle `/tables/{tableId}` resource for GET method
    if (event.resource === '/tables/{tableId}' && event.httpMethod === 'GET') {
        const tableId = event.pathParameters.tableId;
        // Your logic to fetch table data for a specific table ID
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableId: tableId, data: {} }) // Replace with actual data
        };
    }

    // Handle `/reservations` resource
    if (event.resource === '/reservations' && event.httpMethod === 'GET') {
        // Your logic to fetch reservation data from DynamoDB
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservations: [] }) // Replace with actual data
        };
    }

    if (event.resource === '/reservations' && event.httpMethod === 'POST') {
        const { reservationData } = body;
        // Your logic to add reservation data to DynamoDB
        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Reservation created successfully" })
        };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: "Resource not found" })
    };
};
