const { Contract, Op } = require('../model');

class ContractsRepository {
    async getOpenContractsForUser(userId) {
        return await Contract.findAll({
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
