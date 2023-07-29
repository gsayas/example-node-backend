const request = require('supertest');
const app = require('../../app');

describe('GET /jobs/unpaid', () => {
    it('should return all unpaid jobs for the user', async () => {
        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', '4')
            .expect(200);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].id).toBe(5);
        expect(response.body[0].paid).toBe(false);
    });

    it('should return empty array if user has no unpaid jobs', async () => {
        await Job.update({ paid: true }, { where: { id: 1 } });

        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', '1')
            .expect(200);

        expect(response.body).toHaveLength(0);
    });

    it('should return 500 error if invalid user id is provided', async () => {
        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', 'invalid')
            .expect(500);

        expect(response.body.error).toBeDefined();
    });
});
