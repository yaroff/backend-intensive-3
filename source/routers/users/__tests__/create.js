// Core
import request from 'supertest';
import { name, internet, phone } from 'faker';

// Instruments
import { app } from '../../../server';

const getUser = () => ({
    name:     `${name.firstName()} ${name.lastName()}`,
    email:    internet.email(),
    phone:    phone.phoneNumber(),
    password: internet.password(),
    sex:      'm',
});

const server = request.agent(app);
describe('users create:', () => {
    test('should return 200 for create user', async (done) => {
        const response = await server.post('/users').send(getUser());

        expect(response.statusCode).toBe(201);
        done();
    });

    test('data should be an object', async (done) => {
        const response = await server.post('/users').send(getUser());
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });

    test('data should have a required hash field', async (done) => {
        const response = await server.post('/users').send(getUser());
        const { data } = response.body;

        expect(data.hash).toBeDefined();
        done();
    });

    test('data hash field should be a string', async (done) => {
        const response = await server.post('/users').send(getUser());
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data.hash).toBe('string');
        done();
    });
});
