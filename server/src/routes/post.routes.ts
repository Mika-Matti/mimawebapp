import { Router } from "express";
import {
  createPost,
  getPublicPosts,
  getAllPosts,
  getPublicPostById,
  getAnyPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import { verifyAuthentication } from "../utils/auth.middleware";

const router = Router();

// appends of all routes starting with '/posts'
router.post("/", verifyAuthentication, createPost);
router.get("/public", getPublicPosts);
router.get("/public/:id", getPublicPostById);
router.get("/all", verifyAuthentication, getAllPosts);
router.get("/all/:id", verifyAuthentication, getAnyPostById);
router.put("all/:id", verifyAuthentication, updatePost);
router.delete("all/:id", verifyAuthentication, deletePost);

export default router;
