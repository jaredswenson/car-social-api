import { Model, DataTypes, Sequelize } from "sequelize";

export default class ResetCode extends Model {
  public uuid!: string;
  public userId!: string;
  public code!: string;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Define associations.
   * This method is called automatically by Sequelize's lifecycle.
   */
  static associate(models: any) {
    // Example: ResetCode.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export const initResetCodeModel = (sequelize: Sequelize) => {
  ResetCode.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW() + INTERVAL '60 minutes'"),
      },
    },
    {
      sequelize,
      modelName: "ResetCode",
      tableName: "ResetCodes", // Table name in the database
      timestamps: true, // Enable createdAt and updatedAt
    }
  );
};
