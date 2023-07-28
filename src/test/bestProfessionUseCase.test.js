const bestProfessionUseCase = require('../usecase/bestProfessionUseCase');

class MockProfessionRepository {
    getBestProfessions = jest.fn();
}

describe('bestProfessionUseCase', () => {
    let mockProfessionRepository;

    beforeEach(() => {
        mockProfessionRepository = new MockProfessionRepository();
    });

    it('should return the profession with the highest earnings', async () => {
        const mockData = [
            { profession: 'Electrician', earnings: 1000 }
        ];

        mockProfessionRepository.getBestProfessions.mockResolvedValue(mockData);

        const result = await bestProfessionUseCase(mockProfessionRepository, new Date('2022-01-01'), new Date('2023-01-01'));

        expect(result[0].profession).toEqual('Electrician');
        expect(mockProfessionRepository.getBestProfessions).toHaveBeenCalledWith(new Date('2022-01-01'), new Date('2023-01-01'));
    });

    it('should return multiple professions if they have the same highest earnings', async () => {
        const mockData = [
            { profession: 'Plumber', earnings: 500 },
            { profession: 'Electrician', earnings: 500 }
        ];

        mockProfessionRepository.getBestProfessions.mockResolvedValue(mockData);

        const result = await bestProfessionUseCase(mockProfessionRepository, new Date('2022-01-01'), new Date('2023-01-01'));
        const professionNames = result.map(professionEarnings => professionEarnings.profession);

        expect(professionNames).toEqual(['Plumber', 'Electrician']);
        expect(mockProfessionRepository.getBestProfessions).toHaveBeenCalledWith(new Date('2022-01-01'), new Date('2023-01-01'));
    });

    it('should return an empty array if no professions have earnings', async () => {
        mockProfessionRepository.getBestProfessions.mockResolvedValue([]);

        const result = await bestProfessionUseCase(mockProfessionRepository, new Date('2022-01-01'), new Date('2023-01-01'));

        expect(result).toEqual([]);
        expect(mockProfessionRepository.getBestProfessions).toHaveBeenCalledWith(new Date('2022-01-01'), new Date('2023-01-01'));
    });
});
