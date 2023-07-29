const JobRepository = require('../repository/jobRepository');

async function getUnpaidJobsUseCase(userId) {
    const jobRepository = new JobRepository();
    return await jobRepository.getUnpaidJobsForUser(userId);
}

module.exports = getUnpaidJobsUseCase;
