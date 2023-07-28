const ProfessionEarnings = require('../domain/ProfessionEarnings');

async function bestProfessionUseCase(repository, start, end) {
    const bestProfessionsData = await repository.getBestProfessions(start, end);

    const bestProfessions = bestProfessionsData.map(data => new ProfessionEarnings(data.profession, data.earnings));

    return bestProfessions;
}

module.exports = bestProfessionUseCase;
