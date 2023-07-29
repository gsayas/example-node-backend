const payForJobUseCase = require('../usecase/payForJobUseCase');
const getUnpaidJobsUseCase = require('../usecase/getUnpaidJobsUseCase');
const JobRepository = require('../repository/JobRepository');

async function handlePostJob(req, res) {
    const { job_id } = req.params;
    const jobRepository = new JobRepository();

    try {
        const job = await payForJobUseCase(jobRepository, job_id, req.profile.id);
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleGetUnpaidJobs(req, res) {
    const userId = req.profile.id;

    try {
        const jobs = await getUnpaidJobsUseCase(userId);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    handlePostJob,
    handleGetUnpaidJobs
};