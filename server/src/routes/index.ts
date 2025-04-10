import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

export default routes;
