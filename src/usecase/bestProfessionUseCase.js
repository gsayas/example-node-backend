const ProfessionEarnings = require('../domain/ProfessionEarnings');

async function bestProfessionUseCase(repository, start, end) {
    const bestProfessionsData = await repository.getBestProfessions(start, end);

    return new ProfessionEarnings(bestProfessionsData.profession, bestProfessionsData.earnings);
}

module.exports = bestProfessionUseCase;
