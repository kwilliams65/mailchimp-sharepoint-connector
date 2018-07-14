import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
const AWS = require('aws-sdk');
AWS.config.update({region:process.env.AWS_DEFAULT_REGION});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

export const mailchimpWebhookHandler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {

    authenticateRequest(event, context, callback);

    const result = await queueMessage(event);

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };

    return context.succeed(response);
};

function authenticateRequest(event: APIGatewayEvent, context: Context, callback: Callback): void {
    if (!event.queryStringParameters ||
        !event.queryStringParameters.hasOwnProperty('token') ||
        event.queryStringParameters.token !== process.env.MAILCHIMP_AUTH_TOKEN
    )
    {
        const response = {
            statusCode: 401,
            body: JSON.stringify({ 'Error': 'Unauthorized' }),
        };
        callback(null, response);
    }
}

function queueMessage(event: APIGatewayEvent): Promise<string> {
    const params = {
        MessageBody: event.body,
        QueueUrl: process.env.MAILCHIMP_QUEUE_URL
    };

    return sqs.sendMessage(params).promise();
}