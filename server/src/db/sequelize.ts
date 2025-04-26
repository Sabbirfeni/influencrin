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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw new Error("❌ Database connection failed!");
  }
};

export { sequelize, connectToDatabase };
