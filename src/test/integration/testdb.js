const Sequelize = require('sequelize');
const { Job, Profile, Contract } = require('../../model');

const sequelize = new Sequelize('sqlite::memory:', {
    logging: false
});

const testDB = {
    sequelize,
    Profile: Profile,
    Contract: Contract,
    Job: Job
};

Job.initModel(sequelize);
Profile.initModel(sequelize);
Contract.initModel(sequelize);

Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)

const setupTestDB = async () => {
    await sequelize.sync({ force: true });
};

const teardownTestDB = async () => {
    await sequelize.close();
};

module.exports = {
    setupTestDB,
    teardownTestDB,
    testDB
};
