const { Op } = require('../model');

class ContractsRepository {

    //constructor that takes in the sequelize instance
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async getContractDetails(userId, profileId) {
        return await this.sequelize.models.Contract.findOne({
            where: {
                id: userId,
                [Op.or]: [
                    {ContractorId: profileId},
                    {ClientId: profileId}
                ]
            }
        });
    }
    async getOpenContractsForUser(userId) {
        return await this.sequelize.models.Contract.findAll({
            where: {
                status: {
                    [Op.or]: ['new', 'in_progress']
                },
                [Op.or]: [
                    { ClientId: userId },
                    { ContractorId: userId }
                ]
            },
            include: ['Client', 'Contractor']
        });
    }
}

module.exports = ContractsRepository;
