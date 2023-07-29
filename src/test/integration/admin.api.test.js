const request = require('supertest');
const app = require('../../app');

describe('GET /admin/best-clients', () => {
    it('should return a specific number of best clients if a limit is passed', async () => {
        const start = '2020-01-01';
        const end = '2023-07-01';
        const limit = 1;

        const response = await request(app)
            .get(`/admin/best-clients?start=${start}&end=${end}&limit=${limit}`)
            .expect(200);

        expect(response.body).toHaveLength(1);

        response.body.forEach(client => {
            expect(client).toHaveProperty('Contract.ClientId');
            expect(client).toHaveProperty('Contract.Client.firstName');
            expect(client).toHaveProperty('Contract.Client.lastName');
            expect(client).toHaveProperty('total_paid');
        });
    });

    it('should return 2 best clients if no limit is passed', async () => {
        const start = '2020-01-01';
        const end = '2023-07-01';

        const response = await request(app)
            .get(`/admin/best-clients?start=${start}&end=${end}`)
            .expect(200);

        expect(response.body).toHaveLength(2);

        response.body.forEach(client => {
            expect(client).toHaveProperty('Contract.ClientId');
            expect(client).toHaveProperty('Contract.Client.firstName');
            expect(client).toHaveProperty('Contract.Client.lastName');
            expect(client).toHaveProperty('total_paid');
        });
    });

    it('should return an error if the date range is invalid', async () => {
        const start = '2023-07-01';
        const invalidEndDate = '2023-01-01';
        const limit = 2;

        const response = await request(app)
            .get(`/admin/best-clients?start=${start}&end=${invalidEndDate}&limit=${limit}`)
            .expect(500);

        expect(response.body).toHaveProperty('error');
    });
});
