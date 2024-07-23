import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getPageController,
  updatePageController,
  getPageContentController,
  getPage
} from "../controllers/pageController.js";

const router = express.Router();

router.get("/:documentId", requireSignIn, getPage);
router.get("/page-content/:documentId", requireSignIn, getPageContentController);
router.put("/page-content/:pageId", requireSignIn, updatePageController);

export default router;
