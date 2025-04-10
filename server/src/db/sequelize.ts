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

const syncDatabase = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("Database connected successfully!"))
      .catch((err) => console.error("Unable to connect:", err));

    await sequelize.sync({
      // alter: true,
      force: true,
      logging: false,
    });

    console.log("Database synced");
  } catch (error) {
    console.error("Sync error", error);
  }
};

export { sequelize, syncDatabase };
