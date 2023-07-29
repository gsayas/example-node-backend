const request = require('supertest');
const app = require('../../app');

describe('GET /jobs/unpaid', () => {
    it('should return 200', async () => {
        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', '4')
            .expect(200);

        expect(response.body).toBeDefined();
    });

    it('should return 500 error if invalid user id is provided', async () => {
        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', 'invalid')
            .expect(401);
    });
});
