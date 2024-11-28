import { Model, DataTypes, Sequelize } from "sequelize";

export default class User extends Model {
  public uuid!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Define associations.
   * This method is called automatically by Sequelize's lifecycle.
   */
  static associate(models: any) {
    // Define associations here
    // Example: User.hasOne(models.Password, { foreignKey: 'userId' });
  }
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );
};
