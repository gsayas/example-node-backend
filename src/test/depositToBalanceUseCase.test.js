const depositToBalanceUseCase = require('./../usecase/depositToBalanceUseCase');
class MockBalanceRepository {
    getUserWithJobsToPay = jest.fn();
    totalJobsToPay = jest.fn();
    saveClient = jest.fn();
}

describe('depositToBalanceUseCase', () => {
    let mockBalanceRepository;

    beforeEach(() => {
        mockBalanceRepository = new MockBalanceRepository();
    });

    it('should deposit to user balance', async () => {
        const mockUser = {
            id: 1,
            balance: 100,
            Jobs: [
                { price: 200, paid: false },
                { price: 300, paid: false },
            ],
        };
        mockBalanceRepository.getUserWithJobsToPay.mockResolvedValue(mockUser);
        mockBalanceRepository.totalJobsToPay.mockResolvedValue(500);

        const result = await depositToBalanceUseCase(mockBalanceRepository, 1, 50);

        expect(result.balance).toBe(150); //TODO: should the usecase return the balance?
        expect(mockBalanceRepository.getUserWithJobsToPay).toHaveBeenCalledWith(1);
        expect(mockBalanceRepository.saveClient).toHaveBeenCalledWith(result);
    });

    it('should not deposit if the deposit amount exceeds 25% of total jobs to pay', async () => {
        const mockUser = {
            id: 1,
            balance: 100,
            Jobs: [
                { price: 200, paid: false },
                { price: 300, paid: false },
            ],
        };
        mockBalanceRepository.getUserWithJobsToPay.mockResolvedValue(mockUser);
        mockBalanceRepository.totalJobsToPay.mockResolvedValue(500);

        await expect(depositToBalanceUseCase(mockBalanceRepository, 1, 200)).rejects
            .toThrow('Can\'t deposit more than 25% of total jobs to pay');

        expect(mockBalanceRepository.getUserWithJobsToPay).toHaveBeenCalledWith(1);
    });

    it('should not deposit for a non-existing user', async () => {
        mockBalanceRepository.getUserWithJobsToPay.mockResolvedValue(null);

        await expect(depositToBalanceUseCase(mockBalanceRepository, 1, 50)).rejects.toThrow('User not found');

        expect(mockBalanceRepository.getUserWithJobsToPay).toHaveBeenCalledWith(1);
    });

});
