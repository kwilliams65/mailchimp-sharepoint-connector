// require('dotenv').config();
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { routes, Route } from './routes';

export const handler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    const contextProxy = getContextProxy(event, context, callback);

    const requestHandler = getRoute(event.httpMethod, event.path);
    if (requestHandler) {
        await requestHandler.handler(event, contextProxy, callback);
    } else {
        contextProxy.fail(new Error(`Invalid handler ${ event.path }`));
    }
};

function getContextProxy(event: APIGatewayEvent, context: Context, callback: Callback): Context {
    return {
        succeed: context.succeed,
        done: context.done,
        fail: (err: Error) => {
            if (err) {
                console.error(`[Index.handler] ${ event.path }`, err.stack);
            }
            const response = {
                statusCode: 500,
                body: JSON.stringify(err),
            };
            callback(null, response);
        },
    } as Context;
}

function getRoute(httpMethod: string, path: string): Route | undefined {
    return routes.find(x => x.method === httpMethod.toLowerCase() && x.route === path.toLowerCase());
}