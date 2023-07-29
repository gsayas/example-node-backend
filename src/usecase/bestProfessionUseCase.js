const createProfessionEarnings = require('../domain/professionEarnings');

async function bestProfessionUseCase(repository, start, end) {
    const bestProfessionsData = await repository.getBestProfessions(start, end);

    return createProfessionEarnings(bestProfessionsData.profession, bestProfessionsData.earnings);
}

module.exports = bestProfessionUseCase;
