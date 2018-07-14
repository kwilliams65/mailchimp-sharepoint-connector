import { routes } from '../src/routes';
import { expect } from 'chai';

describe('routes', () => {

    it('should contain correct number of routes', () => {
        expect(routes).to.have.lengthOf(1);
    });

    it('should contain mailchimp-webhook route', () => {
        const route = routes.find(x => x.route === '/mailchimp-webhook' && x.method === 'post');
        expect(route).to.not.be.undefined;
    });
})