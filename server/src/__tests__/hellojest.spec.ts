import app from '../app';
import req from 'supertest';

// @TODO: Find a way to runs ts tests without compiling the test files into /dist
// Pretty sure babel is capable of this, just not a priority rn

describe('GET / - a simple api endpoint', () => {
	it('responds to /', async done => {
		const result = await req(app).get('/');
		expect(result);
		done();
	});
});
