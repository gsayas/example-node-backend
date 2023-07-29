const { setupTestDB, teardownTestDB, testDB } = require('./testdb');
const JobsRepository = require("../../repository/JobRepository");
const getUnpaidJobsUseCase = require('../../usecase/getUnpaidJobsUseCase');

describe('getUnpaidJobsUseCase', () => {
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await testDB.sequelize.sync({ force: true });

        const client1 = await testDB.Profile.create({firstName: 'John', lastName: 'Doe', profession: 'Developer', balance: 1000, type: 'client'});
        const contractor1 = await testDB.Profile.create({firstName: 'Alice', lastName: 'Smith', profession: 'Architect', balance: 0, type: 'contractor'});

        const contract1 = await testDB.Contract.create({status: 'in_progress', terms: 'contract 1 terms', ContractorId: contractor1.id, ClientId: client1.id});

        await testDB.Job.create({description: 'job 1', price: 500, paid: null, ContractId: contract1.id});
        await testDB.Job.create({description: 'job 2', price: 500, paid: true, ContractId: contract1.id});
    });

    it('should return unpaid jobs for valid user id', async () => {
        const jobs = await getUnpaidJobsUseCase(new JobsRepository(testDB.sequelize), 1);

        expect(jobs).toBeDefined();
        expect(jobs.length).toBe(1);
        expect(jobs[0].paid).toBe(null);
    });
});
