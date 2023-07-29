const { Job, Contract, Profile, Op } = require('../model');

class BestClientsRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async getBestClients(start, end, limit) {
        const result = await Job.findAll({
            attributes: ['Contract.ClientId', [this.sequelize.fn('SUM', this.sequelize.col('price')), 'total_paid']],
            include: [{
                model: Contract,
                as: 'Contract',
                include: [
                    {
                        model: Profile,
                        as: 'Client',
                        attributes: ['firstName', 'lastName', 'id']
                    }
                ]
            }],
            where: {
                paymentDate: {
                    [Op.between]: [start, end]
                },
                paid: true
            },
            group: ['Contract.ClientId', 'Contract.Client.firstName', 'Contract.Client.lastName', 'Contract.Client.id'],
            order: [[this.sequelize.literal('total_paid'), 'DESC']],
            limit: limit
        });

        return result.map(r => r.get({ plain: true }));
    }
}

module.exports = BestClientsRepository;
