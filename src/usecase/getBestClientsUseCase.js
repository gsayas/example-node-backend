
async function getBestClientsUseCase(bestClientsRepository, start, end, limit = 2) {

    if (new Date(end) <= new Date(start)) {
        throw new Error('End date must be greater than start date');
    }

    return await bestClientsRepository.getBestClients(start, end, limit);
}

module.exports = getBestClientsUseCase;
