const { sequelize, Profile, Job, Contract } = require('../model');

class JobRepository {
    async findJobWithContract(jobId) {
        return await Job.findOne({
            where: { id: jobId },
            include: {
                model: Contract,
                as: 'Contract',
                include: [
                    { model: Profile, as: 'Client' },
                    { model: Profile, as: 'Contractor' }
                ]
            }
        });
    }

    async saveJob(job) {
        return await job.save();
    }

    async saveProfile(profile) {
        return await profile.save();
    }
    async beginTransaction() {
        this.transaction = await sequelize.transaction();
    }

    async commitTransaction() {
        await this.transaction.commit();
    }

    async rollbackTransaction() {
        await this.transaction.rollback();
    }

}

module.exports = JobRepository;
