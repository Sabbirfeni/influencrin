import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false, // for development only. change it to 'true' for production.
    },
  },
});

// Database connection and synchronization with separate then blocks and error handling
const syncDatabase = (): void => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      throw new Error("Database connection failed!");
    })
    .then(() => {
      // Sync the database models, automatically adjusting them as needed
      return sequelize.sync({
        alter: true, // Updates the schema (without dropping tables)
        // force: true, // To drop all tables and recreate them (only in development)
        logging: false,
      });
    })
    .then(() => {
      console.log("Database synced successfully!");
    })
    .catch((error) => {
      console.error("Error during database synchronization:", error);
      throw new Error("Database sync failed!");
    });
};

export { sequelize, syncDatabase };
