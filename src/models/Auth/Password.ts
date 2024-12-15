import { Model, DataTypes, Sequelize } from "sequelize";

export default class Password extends Model {
  public uuid!: string;
  public userUuid!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Define associations.
   * This method is called automatically by Sequelize's lifecycle.
   */
  static associate(models: any) {
    // Define associations here
    // For example: Password.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

// Initialize the Password model
export const initPasswordModel = (sequelize: Sequelize) => {
  Password.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
        allowNull: false,
        primaryKey: true,
      },
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Password",
      tableName: "Passwords",
      timestamps: true, // Enable createdAt and updatedAt
    }
  );
};
