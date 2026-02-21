import { Router } from "express";
import { requireAuth } from "../middleware/checkAuth.js";
import { handleLogout } from "../controllers/usersController.js";

const logoutRouter = Router();

logoutRouter.get("/", requireAuth, handleLogout);

export default logoutRouter;
