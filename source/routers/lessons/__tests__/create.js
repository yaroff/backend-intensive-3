// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
describe('lessons create:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 200 for create class', async (done) => {
        const response = await server.post('/lessons').send({});

        expect(response.statusCode).toBe(201);
        done();
    });

    test('data should be an object', async (done) => {
        const response = await server.post('/lessons').send({});
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });

    test('data should have a required hash field', async (done) => {
        const response = await server.post('/lessons').send({});
        const { data } = response.body;

        expect(data.hash).toBeDefined();
        done();
    });

    test('data hash field should be a string', async (done) => {
        const response = await server.post('/lessons').send({});
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data.hash).toBe('string');
        done();
    });
});
