import { Handler } from 'aws-lambda';
import { mailchimpWebhookHandler } from './mailchimp-webhook';

export const routes: Route[] = [
  {
    route: '/mailchimp-webhook',
    method: 'post',
    handler: mailchimpWebhookHandler
  },
  {
    route: '/mailchimp-webhook',
    method: 'get',
    handler: mailchimpWebhookHandler
  },
];

export interface Route {
  route: string;
  method: string;
  handler: Handler;
}