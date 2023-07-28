const request = require('supertest');
const app = require('../app');

describe('GET /contracts/:id', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a contract if the user is the contractor', async () => {

        const response = await request(app)
            .get('/contracts/1')
            .set('profile_id', '5');

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual( 1);
        expect(response.body.ContractorId).toEqual( 5);
    });

    it('should return a contract if the user is the client', async () => {

        const response = await request(app)
            .get('/contracts/1')
            .set('profile_id', '1');

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual( 1);
        expect(response.body.ClientId).toEqual( 1);
    });

    it('should return 404 if the contract does not belong to the user', async () => {

        const response = await request(app)
            .get('/contracts/1')
            .set('profile_id', '6');

        expect(response.statusCode).toBe(404);
    });
});
