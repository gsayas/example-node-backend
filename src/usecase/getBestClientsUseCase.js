const BestClientsRepository = require('../repository/BestClientsRepository');

async function getBestClientsUseCase(start, end, limit = 2) {
    const bestClientsRepository = new BestClientsRepository();

    if (new Date(end) <= new Date(start)) {
        throw new Error('End date must be greater than start date');
    }

    return await bestClientsRepository.getBestClients(start, end, limit);
}

module.exports = getBestClientsUseCase;
