const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    region: process.env.region
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const reservationsTable = process.env.revtable
const tablesTable = process.env.tablestable

exports.handler = async (event) => {
    const userPoolId = process.env.CUPId;
    const clientId = process.env.CUPClientId;

    // Parse the request body
    let body = JSON.parse(event.body)

    console.log(body);
    console.log(event);
    
    
    // Handle `/signup` endpoint
    if (event.resource === '/signup' && event.httpMethod === 'POST') {
        console.log('THIS IS SIMG UP');
        
        const { email, password, firstName, lastName } = body;
        const params = {
            UserPoolId: userPoolId,
            Username: email,
            TemporaryPassword: password,
            MessageAction: "SUPPRESS", 
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'name', Value: firstName + lastName }
            ]
        };

        try {
            await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "User created successfully" })
            };
        } catch (error) {
            console.log(error);

            return {
                statusCode: 400,
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
            console.log(data);
            
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: data.Session || 
                'blank'
                })
            };
        } catch (error) {
            console.log(error);
            
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Authentication failed", details: error })
            };
        }
    }

    if (event.resource === '/tables' && event.httpMethod === 'GET') {
        const params = {
            TableName: tablesTable
        };
        try {
            const data = await dynamoDB.scan(params).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tables: data.Items }) // Returns all tables
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Failed to fetch tables", details: error.message })
            };
        }
    }


    if (event.resource === '/tables' && event.httpMethod === 'POST') {
        try{
            const params = {
                TableName: tablesTable,
                Item:body
            };
            await dynamoDB.put(params).promise()
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Table data added successfully" })
            };
        }catch(e){
            console.log(e);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "error" })
            };
        }
        
    }

    // Handle `/tables/{tableId}` resource for GET method
    if (event.resource === '/tables/{tableId}' && event.httpMethod === 'GET') {
        const tableId = event.pathParameters.tableId;
        const params = {
            TableName: tablesTable,
            Key: { id: tableId } // Assuming `id` is the primary key in the tablesTable
        };
        try {
            const data = await dynamoDB.get(params).promise();
            if (data.Item) {
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tableId: tableId, data: data.Item })
                };
            } else {
                return {
                    statusCode: 404,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ error: "Table not found" })
                };
            }
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Failed to fetch table data", details: error.message })
            };
        }
    }






    if (event.resource === '/reservations' && event.httpMethod === 'GET') {
        try {
            const params = { TableName: reservationsTable }
            const data = await dynamoDB.scan(params).promise()
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reservations: data }) // Replace with actual data
            };
        } catch (e) {
            console.log(e);

            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: e.message
            }
        }

    }




    if (event.resource === '/reservations' && event.httpMethod === 'POST') {
        try {
            const reservationData = body;
            const params = {
                TableName: reservationsTable,
                Item: reservationData // Assuming reservationData is an object with required attributes
            };
            await dynamoDB.put(params).promise();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Reservation created successfully" })
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Reservation created successfully" })
            };
        }

    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: "Resource not found" })
    };
};
