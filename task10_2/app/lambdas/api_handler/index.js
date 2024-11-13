const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    region: process.env.region
});


exports.handler = async (event) => {
    // TODO implement

    const userPoolId = process.env.CUPId;
    const clientId = process.env.CUPClientId;

    const { email, password, firstName, lastNameF } = event.body
    if (event.resource === '/signup') {
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
            const idToken = data.AuthenticationResult.IdToken;
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken: idToken })
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ error: "Authentication failed", details: error.message })
            };
        }
    } else {
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    }

};
