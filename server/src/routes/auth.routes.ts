import { Router } from "express";
import { authenticateUser, logoutUser } from "../controllers/auth.controller";

const router = Router();

// appends of all routes starting with '/auth'
router.post("/login", authenticateUser);

router.post("/logout", logoutUser);

export default router;
