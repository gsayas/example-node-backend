const { Op } = require('sequelize');

class ProfessionRepository {
    constructor(models) {
        this.models = models;
    }

    async getBestProfessions(start, end) {
        const result = await this.models.Job.findAll({
            attributes: ['Contractor.profession', [this.models.sequelize.fn('SUM', this.models.sequelize.col('price')), 'earnings']],
            include: [{
                model: this.models.Contract,
                as: 'Contract',
                include: [
                    {
                        model: this.models.Profile,
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
            group: ['Contractor.profession'],
            order: [[this.models.sequelize.literal('earnings'), 'DESC']]
        });

        // Converting raw sequelize response to regular JS objects
        return result.map(r => r.get({ plain: true }));
    }
}

module.exports = ProfessionRepository;
