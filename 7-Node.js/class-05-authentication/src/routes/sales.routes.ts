import { Router } from "express";
import { salesControllers } from "../controllers/salesControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleAuthMiddleware } from "../middleware/roleAuthMiddleware";

export const salesRoutes = Router();

salesRoutes.use(authMiddleware, roleAuthMiddleware(["admin"]));
salesRoutes.get("/sales", salesControllers.read);
