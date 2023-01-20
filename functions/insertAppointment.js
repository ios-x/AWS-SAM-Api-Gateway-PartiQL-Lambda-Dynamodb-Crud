//get table name from the environment virable as in the template.yaml file
const Appointment = process.env.APPOINTMENT_TABLE;
//adding the needful packages
const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB();
const uuid = require('node-uuid');
//function to insert data into the DynamoDB table
exports.insertAppointment = async (event) => {
    const { body } = event;   // It destructures the body payload from event. 
    let parsedBody = JSON.parse(body); // It parses the JSON payload to java script object 
    // The item contains fully order Item. 
    let bookAppointment = {
        id: uuid.v4(),
        name: parsedBody.name,
        appointment_date: parsedBody.appointment_date,
    }
    // We use 'insert' statement to put items into Dynamodb.
    try {
        // stringify object to what PartiQL will accept
        var item = JSON.stringify(bookAppointment);
// replace double quotes with sngle quotes as PartiQL will reject a query with double quotes
        item = item.replaceAll("\"", "'");
        await dynamoDbClient.executeStatement(
            {
                Statement: `INSERT INTO ${Appointment} VALUE ${item}`
            }).promise();
    } catch (err) {
        console.log("Error inserting data", err.message)
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(bookAppointment)

    };
    return response;
}