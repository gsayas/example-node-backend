const payForJobUseCase = require('./../usecase/payForJobUseCase');
class MockJobRepository {
    findJobWithContract = jest.fn();
    saveJob = jest.fn();
    saveProfile = jest.fn();
    beginTransaction = jest.fn();
    commitTransaction = jest.fn();
    rollbackTransaction = jest.fn();
}

describe('payForJobUseCase', () => {
    let mockJobRepository;

    beforeEach(() => {
        mockJobRepository = new MockJobRepository();
    });

    it('should pay for a job', async () => {
        const mockJob = {
            id: 1,
            price: 100,
            paid: false,
            Contract: {
                Client: {
                    id: 1,
                    balance: 200,
                },
                Contractor: {
                    id: 2,
                    balance: 0,
                },
            },
        };

        mockJobRepository.findJobWithContract.mockResolvedValue(mockJob);

        const result = await payForJobUseCase(mockJobRepository, 1, 1);

        expect(result.paid).toBe(true);
        expect(result.Contract.Client.balance).toBe(100);
        expect(result.Contract.Contractor.balance).toBe(100);

        expect(mockJobRepository.findJobWithContract).toHaveBeenCalledWith(1);
        expect(mockJobRepository.saveJob).toHaveBeenCalledWith(result);
        expect(mockJobRepository.saveProfile).toHaveBeenCalledTimes(2);
    });

    // Add more tests to handle other scenarios such as "Job not found", "Insufficient balance", etc.
});
