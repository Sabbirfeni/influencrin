import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routers/index.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Start Server
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

app.listen(PORT, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});

// sync database tables
// import { syncDatabase } from "./db/sequelize.js";
// import models from "./models/index.js"; // Import once — registers all models
// syncDatabase(); // Only run this once during app startup
