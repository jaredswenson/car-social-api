import { Sequelize } from "sequelize";
import {
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPassword,
} from "../configs/environment";
import { logger } from "../configs/logger";
import { initUserModel } from "../models/User/User";
import { initPasswordModel } from "../models/Auth/Password";
import { initResetCodeModel } from "../models/Auth/ResetCode";

console.log(dbHost, dbPort, dbName, dbUser, dbPassword);
let sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  {
    dialectOptions: {
      ssl: false,
    },
  }
);

initUserModel(sequelize);
initPasswordModel(sequelize);
initResetCodeModel(sequelize);

const connect = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Postgres connection has been established successfully.");
    //Don't keep this forever
    sequelize.sync({ alter: true });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

let reconnecting = false;

const reconnect = async () => {
  if (reconnecting) {
    return;
  }
  reconnecting = true;

  try {
    logger.info("Reconnecting to the database");
    await sequelize.close();
    sequelize = new Sequelize(
      `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
      {
        dialectOptions: {
          ssl: false,
        },
      }
    );
    await connect();
  } catch (error) {
    logger.error("Failed to reconnect to the database:", error);
  } finally {
    reconnecting = false;
  }
};

export { sequelize, connect, reconnect };
