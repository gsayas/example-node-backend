import { Sequelize, Transaction } from "sequelize";
import { Op } from "../model";
import { Job, Contract, Profile } from "../model";

export class JobRepository {
  private sequelize: Sequelize;
  private transaction?: Transaction;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async getUnpaidJobsForUser(userId: number) {
    return await this.sequelize.models.Job.findAll({
      include: [
        {
          model: this.sequelize.models.Contract,
          as: "Contract",
          where: {
            status: "in_progress",
            [Op.or]: [{ ContractorId: userId }, { ClientId: userId }],
          },
          include: [
            {
              model: this.sequelize.models.Profile,
              as: "Contractor",
              attributes: [],
            },
            {
              model: this.sequelize.models.Profile,
              as: "Client",
              attributes: [],
            },
          ],
        },
      ],
      where: {
        paid: null,
      },
    });
  }

  async findJobWithContract(jobId: string | number) {
    return await this.sequelize.models.Job.findOne({
      where: { id: jobId },
      include: {
        model: this.sequelize.models.Contract,
        as: "Contract",
        include: [
          { model: this.sequelize.models.Profile, as: "Client" },
          { model: this.sequelize.models.Profile, as: "Contractor" },
        ],
      },
    });
  }

  async saveJob(job: any): Promise<void> {
    await job.save();
  }

  async saveProfile(profile: any): Promise<void> {
    await profile.save();
  }

  async beginTransaction(): Promise<void> {
    this.transaction = await this.sequelize.transaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.transaction) {
      await this.transaction.commit();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.transaction) {
      await this.transaction.rollback();
    }
  }
}
