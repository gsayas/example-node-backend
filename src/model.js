const Sequelize = require('sequelize');

class Profile extends Sequelize.Model {
    static initModel(sequelize) {
        Profile.init(
            {
                firstName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                lastName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                profession: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                balance:{
                    type:Sequelize.DECIMAL(12,2)
                },
                type: {
                    type: Sequelize.ENUM('client', 'contractor')
                }
            },
            {
                sequelize,
                modelName: 'Profile'
            }
        )
    }
}

class Contract extends Sequelize.Model {
    static initModel(sequelize) {
        Contract.init(
            {
                terms: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                status:{
                    type: Sequelize.ENUM('new','in_progress','terminated')
                }
            },
            {
                sequelize,
                modelName: 'Contract'
            }
        );
    }
}

class Job extends Sequelize.Model {
    static initModel(sequelize) {
        Job.init(
            {
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                price:{
                    type: Sequelize.DECIMAL(12,2),
                    allowNull: false
                },
                paid: {
                    type: Sequelize.BOOLEAN,
                    default:false
                },
                paymentDate:{
                    type: Sequelize.DATE
                }
            },
            {
                sequelize,
                modelName: 'Job'
            }
        );
    }
}

module.exports = {
  Profile,
  Contract,
  Job,
  Op: Sequelize.Op
};
