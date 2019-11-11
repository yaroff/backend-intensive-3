// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../../../../server';

const server = request.agent(app);
describe('video hash remove:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 204 for remove video by hash', async (done) => {
        const response = await server.delete('/lessons/1/videos/1').send({});

        expect(response.statusCode).toBe(204);
        done();
    });

    test('data should be undefined', async (done) => {
        const response = await server.delete('/lessons/1/videos/1').send({});
        const { data } = response.body;

        expect(data).toBeUndefined();
        done();
    });
});
