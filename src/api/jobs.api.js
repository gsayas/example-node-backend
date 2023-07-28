const payForJobUseCase = require('../usecase/payForJobUseCase');
const JobRepository = require('../repository/jobRepository');

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

module.exports = {
    handlePostJob
};