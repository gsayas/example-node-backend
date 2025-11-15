import { Model, DataTypes, Sequelize, Op } from "sequelize";

export class Profile extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare profession: string;
  declare balance: number;
  declare type: "client" | "contractor";
  static initModel(sequelize: Sequelize): void {
    Profile.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profession: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        balance: {
          type: DataTypes.DECIMAL(12, 2),
        },
        type: {
          type: DataTypes.ENUM("client", "contractor"),
        },
      },
      {
        sequelize,
        modelName: "Profile",
      }
    );
  }
}

export class Contract extends Model {
  static initModel(sequelize: Sequelize): void {
    Contract.init(
      {
        terms: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("new", "in_progress", "terminated"),
        },
      },
      {
        sequelize,
        modelName: "Contract",
      }
    );
  }
}

export class Job extends Model {
  static initModel(sequelize: Sequelize): void {
    Job.init(
      {
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        paymentDate: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Job",
      }
    );
  }
}

export { Op };
