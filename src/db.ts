import { Sequelize } from "sequelize";
import {
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPassword,
} from "./configs/environment";
<<<<<<< Updated upstream

// change to your URI
const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
=======
import { logger } from "./configs/logger";
console.log(dbHost, dbPort, dbName, dbUser, dbPassword);
let sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  {
    dialectOptions: {
      ssl: false,
    },
  }
>>>>>>> Stashed changes
);
const connect = () => {
  try {
    sequelize.authenticate().then(() => {
      console.log("Postgres connection has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
<<<<<<< Updated upstream
export { sequelize, connect };
=======

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
>>>>>>> Stashed changes
