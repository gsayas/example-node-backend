import { Sequelize } from "sequelize";
import { Job, Contract, Profile, Op } from "../model";

export class BestClientsRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async getBestClients(start: string, end: string, limit: number) {
    const result = await Job.findAll({
      attributes: [
        "Contract.ClientId",
        [this.sequelize.fn("SUM", this.sequelize.col("price")), "total_paid"],
      ],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Profile,
              as: "Client",
              attributes: ["firstName", "lastName", "id"],
            },
          ],
        },
      ],
      where: {
        paymentDate: {
          [Op.between]: [start, end],
        },
        paid: true,
      },
      group: [
        "Contract.ClientId",
        "Contract.Client.firstName",
        "Contract.Client.lastName",
        "Contract.Client.id",
      ],
      order: [[this.sequelize.literal("total_paid"), "DESC"]],
      limit: limit,
    });

    return result.map((r) => r.get({ plain: true }));
  }
}
