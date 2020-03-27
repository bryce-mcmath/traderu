import * as server from '../index';
import req from 'supertest';

describe('GET / - a simple api endpoint', () => {
	it('responds to /', async function testRoot() {
		const result = await req(server).get('/');
		expect(result.status).toEqual(200);
	});
});
