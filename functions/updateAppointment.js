const Appointment = process.env.APPOINTMENT_TABLE;
const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB();

exports.updateAppointment = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`updateItem only accept PUT method, you tried: ${event.httpMethod}`);
    }
    let appointmentId = JSON.stringify(event.pathParameters.appointmentId); // It gets the OrderId from parameter.
    appointmentId =appointmentId.replaceAll("\"", "'"); 
    const { body} = event;    // It destructures the 'body' payload from event
    let parsedBody = JSON.parse(body);  // It parses the JSON payload to java script object
    console.log('Date parsed', JSON.stringify(parsedBody.appointment_date));
    let appointment_date = JSON.stringify(parsedBody.appointment_date)
    appointment_date = appointment_date.replaceAll("\"", "'"); 

    // Calls the update expression to update the item
    try {
        await dynamoDbClient.executeStatement(
            {
                Statement: `UPDATE ${Appointment} SET appointment_date = ${appointment_date} WHERE id = ${appointmentId}`  
            }).promise();
        console.log("Success for updating Item")
    } catch (err) {
        console.log("Error during update", err.message)
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(parsedBody)
    };
    return response;
}