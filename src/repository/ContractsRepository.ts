import { Sequelize, Transaction } from "sequelize";
import { Op, Contract } from "../model";

export class ContractsRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async getContractDetails(
    userId: string | number,
    profileId: number
  ): Promise<Contract | null> {
    return (await this.sequelize.models.Contract.findOne({
      where: {
        id: userId,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    })) as Contract | null;
  }

  async getOpenContractsForUser(userId: number) {
    return await this.sequelize.models.Contract.findAll({
      where: {
        status: {
          [Op.or]: ["new", "in_progress"],
        },
        [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
      },
      include: ["Client", "Contractor"],
    });
  }
}
