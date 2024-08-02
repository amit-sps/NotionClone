import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getBlogPosts } from "../controllers/blogControllers.js";

const router = express.Router();

// Get favorite documents with optional quantity parameter
router.get("/pages/:quantity?", requireSignIn, getBlogPosts);

export default router;
