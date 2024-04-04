import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

export const routers = Router();

routers.use(authRoutes);
routers.use(userRoutes);