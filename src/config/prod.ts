import { Sequelize } from "sequelize";
import { Profile, Contract, Job } from "../model";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

Profile.initModel(sequelize);
Contract.initModel(sequelize);
Job.initModel(sequelize);

Profile.hasMany(Contract, { as: "Contractor", foreignKey: "ContractorId" });
Contract.belongsTo(Profile, { as: "Contractor" });
Profile.hasMany(Contract, { as: "Client", foreignKey: "ClientId" });
Contract.belongsTo(Profile, { as: "Client" });
Contract.hasMany(Job);
Job.belongsTo(Contract);

export default sequelize;
