import { Handler } from 'aws-lambda';
import { mailchimpWebhookHandler } from './mailchimp-webhook';

export const routes: Route[] = [
  {
    route: '/mailchimp-webhook',
    method: 'post',
    handler: mailchimpWebhookHandler
  },
];

export interface Route {
  route: string;
  method: string;
  handler: Handler;
}