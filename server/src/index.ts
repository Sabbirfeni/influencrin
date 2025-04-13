import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import "./models"; // Make sure models are initialized

import { connectToDatabase, syncDatabase } from "./db/sequelize";
import { seedInfluencers } from "./db/seeders/influencers-seed";
import { seedInfluencerCategories } from "./db/seeders/influencer-categories-seed";
import { seedInfluencerSocialPlatforms } from "./db/seeders/influencer-social-platforms-seed";
import { seedReviews } from "./db/seeders/influencer-reviews-seed";

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Start server only after DB is ready
const startServer = async () => {
  try {
    await connectToDatabase();
    // await syncDatabase(); // only alter: true or force: true in dev
    // await seedInfluencers();
    // await seedInfluencerCategories();
    // await seedInfluencerSocialPlatforms();
    // await seedReviews();

    app.use("/api", routes);

    app.listen(port, () => {
      console.log(`✅ Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
