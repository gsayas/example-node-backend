const { sequelize, Profile, Job, Contract, Op } = require('../model');

class JobRepository {
    async getUnpaidJobsForUser(userId) {
        return await Job.findAll({
            include: [{
                model: Contract,
                as: 'Contract',
                where: {
                    status: 'in_progress',
                    [Op.or]: [
                        { ContractorId: userId },
                        { ClientId: userId }
                    ]
                },
                include: [{
                    model: Profile,
                    as: 'Contractor',
                    attributes: []
                },{
                    model: Profile,
                    as: 'Client',
                    attributes: []
                }]
            }],
            where: {
                paid: null
            }
        });
    }
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
