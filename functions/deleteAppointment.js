const Appointment = process.env.APPOINTMENT_TABLE;
const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB();

exports.deleteAppointment = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`DELETEItem only accept DELETE method, you tried: ${event.httpMethod}`);
    }
    let appointmentId = JSON.stringify(event.pathParameters.appointmentId); // It gets the OrderId from parameter.
    appointmentId =appointmentId.replaceAll("\"", "'"); 
    const { body} = event;    // It destructures the 'body' payload from event
    let parsedBody = JSON.parse(body);  // It parses the JSON payload to java script object

    // Calls the delete expression to update the item
    try {
        await dynamoDbClient.executeStatement(
            {
                Statement: `DELETE FROM ${Appointment} WHERE id = ${appointmentId}`  
            }).promise();
        console.log('ITEM DELETED');
    } catch (err) {
        console.log("Error during delete", err.message)
    }

    const response = {
        statusCode: 200,
        body: ('You have canceled your Appointment',appointmentId)
    };
    return response;
}