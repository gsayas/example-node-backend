const { Job, Contract, Profile, Op } = require('../model');
const Sequelize = require('sequelize');


class ProfessionRepository {

    //constructor that takes in the sequelize instance
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async getBestProfessions(start, end) {
        const result = await Job.findAll({
            attributes: [[Sequelize.col('Contract.Contractor.profession'), 'profession'], [this.sequelize.fn('SUM', this.sequelize.col('price')), 'earnings']],
            include: [{
                model: Contract,
                as: 'Contract',
                include: [
                    {
                        model: Profile,
                        as: 'Contractor',
                        attributes: []
                    }
                ]
            }],
            where: {
                paymentDate: {
                    [Op.between]: [start, end]
                },
                paid: 1
            },
            group: [Sequelize.col('Contract.Contractor.profession')],
            order: [[this.sequelize.literal('earnings'), 'DESC']],
            limit: 1
        });

        // Converting raw sequelize response to regular JS objects
        const plainResult = result.map(r => r.get({ plain: true }));

        return plainResult[0] || {};
    }
}

module.exports = ProfessionRepository;
