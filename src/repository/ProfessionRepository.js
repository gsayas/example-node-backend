const { sequelize, Job, Contract, Profile, Op } = require('../model');
const Sequelize = require('sequelize');


class ProfessionRepository {

    async getBestProfessions(start, end) {
        const result = await Job.findAll({
            attributes: [[Sequelize.col('Contract.Contractor.profession'), 'profession'], [sequelize.fn('SUM', sequelize.col('price')), 'earnings']],
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
                paid: true
            },
            group: [Sequelize.col('Contract.Contractor.profession')],
            order: [[sequelize.literal('earnings'), 'DESC']],
            limit: 1
        });

        // Converting raw sequelize response to regular JS objects
        const plainResult = result.map(r => r.get({ plain: true }));

        return plainResult[0] || {};
    }
}

module.exports = ProfessionRepository;
