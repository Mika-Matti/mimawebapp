import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { verifyAuthentication } from "../utils/auth.middleware";

const router = Router();

// appends of all routes starting with '/projects'
router.post("/", verifyAuthentication, createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", verifyAuthentication, updateProject);
router.delete("/:id", verifyAuthentication, deleteProject);

export default router;
