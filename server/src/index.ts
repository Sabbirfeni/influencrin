import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import "./models"; // Make sure models are initialized

import { connectToDatabase } from "./db/sequelize";

import path from "path";
import runSeeds from "./db/seeds";

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Start server only after DB is ready
const startServer = async () => {
  try {
    await connectToDatabase();

    // await runSeeds();

    app.listen(port, () => {
      console.log(`✅ Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
