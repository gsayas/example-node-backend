const { Op } = require('../model');

class JobRepository {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async getUnpaidJobsForUser(userId) {
        return await this.sequelize.models.Job.findAll({
            include: [{
                model: this.sequelize.models.Contract,
                as: 'Contract',
                where: {
                    status: 'in_progress',
                    [Op.or]: [
                        { ContractorId: userId },
                        { ClientId: userId }
                    ]
                },
                include: [{
                    model: this.sequelize.models.Profile,
                    as: 'Contractor',
                    attributes: []
                },{
                    model: this.sequelize.models.Profile,
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
        return await this.sequelize.models.Job.findOne({
            where: { id: jobId },
            include: {
                model: this.sequelize.models.Contract,
                as: 'Contract',
                include: [
                    { model: this.sequelize.models.Profile, as: 'Client' },
                    { model: this.sequelize.models.Profile, as: 'Contractor' }
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
        this.transaction = await this.sequelize.transaction();
    }

    async commitTransaction() {
        await this.transaction.commit();
    }

    async rollbackTransaction() {
        await this.transaction.rollback();
    }

}

module.exports = JobRepository;
