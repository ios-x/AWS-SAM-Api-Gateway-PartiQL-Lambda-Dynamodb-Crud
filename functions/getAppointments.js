const Appointment = process.env.APPOINTMENT_TABLE;
const AWS = require('aws-sdk'); 
const dynamoDbClient = new AWS.DynamoDB();

async function executeExecuteStatements() {
    // Call DynamoDB's executeStatement API
    try {
        const statement = `select * from  ${Appointment}`
        const executeStatementOutput = await dynamoDbClient.executeStatement({Statement: statement}).promise();
        console.log('Results', executeStatementOutput);
        return executeStatementOutput;
    } catch (err) {
        console.log('Failure', err.message);
    }
}

exports.getAppointments = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);
    let items = {};

    // It calls the fetchAllOrders method above
    try {
        items = await executeExecuteStatements();
    } catch (err) {
        console.log('Failure', err.message);
    }

    // It returns the items to client with status code: 200
    const response = {
        statusCode: 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(items),
    };
    return response;
};