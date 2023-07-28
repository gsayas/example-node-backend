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

    it('should not pay for a non-existing job', async () => {
        mockJobRepository.findJobWithContract.mockResolvedValue(null);

        await expect(payForJobUseCase(mockJobRepository, 1, 1)).rejects.toThrow('Job not found');

        expect(mockJobRepository.beginTransaction).toHaveBeenCalledTimes(1);
        expect(mockJobRepository.findJobWithContract).toHaveBeenCalledWith(1);
        expect(mockJobRepository.rollbackTransaction).toHaveBeenCalledTimes(1);
    });

    it('should not pay for a job if client balance is insufficient', async () => {
        const mockJob = {
            id: 1,
            price: 100,
            paid: false,
            Contract: {
                Client: {
                    id: 1,
                    balance: 50, // insufficient balance
                },
                Contractor: {
                    id: 2,
                    balance: 0,
                },
            },
        };

        mockJobRepository.findJobWithContract.mockResolvedValue(mockJob);

        await expect(payForJobUseCase(mockJobRepository, 1, 1)).rejects.toThrow('Insufficient balance');

        expect(mockJobRepository.beginTransaction).toHaveBeenCalledTimes(1);
        expect(mockJobRepository.findJobWithContract).toHaveBeenCalledWith(1);
        expect(mockJobRepository.rollbackTransaction).toHaveBeenCalledTimes(1);
    });

    it('should not pay for a job if it has already been paid', async () => {
        const mockJob = {
            id: 1,
            price: 100,
            paid: true, // job has already been paid
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

        await expect(payForJobUseCase(mockJobRepository, 1, 1)).rejects.toThrow('Job has already been paid');

        expect(mockJobRepository.beginTransaction).toHaveBeenCalledTimes(1);
        expect(mockJobRepository.findJobWithContract).toHaveBeenCalledWith(1);
        expect(mockJobRepository.rollbackTransaction).toHaveBeenCalledTimes(1);
    });

});
