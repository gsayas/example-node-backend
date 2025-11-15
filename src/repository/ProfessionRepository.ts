import { Sequelize } from "sequelize";
import { Job, Contract, Profile, Op } from "../model";

export class ProfessionRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async getBestProfessions(start: Date, end: Date) {
    const result = await Job.findAll({
      attributes: [
        [Sequelize.col("Contract.Contractor.profession"), "profession"],
        [this.sequelize.fn("SUM", this.sequelize.col("price")), "earnings"],
      ],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Profile,
              as: "Contractor",
              attributes: [],
            },
          ],
        },
      ],
      where: {
        paymentDate: {
          [Op.between]: [start, end],
        },
        paid: 1,
      },
      group: [Sequelize.col("Contract.Contractor.profession")],
      order: [[this.sequelize.literal("earnings"), "DESC"]],
      limit: 1,
    });

    // Converting raw sequelize response to regular JS objects
    const plainResult = result.map((r) => r.get({ plain: true }));

    return plainResult[0] || {};
  }
}
