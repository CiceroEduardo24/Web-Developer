import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { salesRoutes } from "./sales.routes";

export const routers = Router();

routers.use(authRoutes);
routers.use(userRoutes);
routers.use(salesRoutes);
