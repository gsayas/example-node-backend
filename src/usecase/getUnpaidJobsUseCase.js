

async function getUnpaidJobsUseCase(jobsRepository, userId) {
    return await jobsRepository.getUnpaidJobsForUser(userId);
}

module.exports = getUnpaidJobsUseCase;
