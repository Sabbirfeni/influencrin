import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import { syncDatabase } from "./db/sequelize.js";
// import models from "./models/index.js"; // Import once — registers all models

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// sync database tables
// syncDatabase(); // Only run this once during app startup

// Routes

// Start Server
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});
