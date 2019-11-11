// Core
import request from 'supertest';

// Instruments
import { app } from '../../server';

const server = request.agent(app);
describe('users read:', () => {
    test('should return 200 for getting all users', async (done) => {
        const response = await server.get('/not-found');

        expect(response.statusCode).toBe(404);
        done();
    });
});
