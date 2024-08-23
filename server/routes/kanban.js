import express from "express";
import {
  createKanbanBoard,
  getKanbanById,
  getMyKanbanBoards,
  createKanbanGroup,
  getKanbanGroups,
  createKanbanTask,
  taskStatusList,
  getTaskListByGroup
} from "../controllers/kanban.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .post("/", requireSignIn, createKanbanBoard)
  .get("/", requireSignIn, getMyKanbanBoards)
  .get("/:kanbanId", requireSignIn, getKanbanById);

router.post("/group", requireSignIn, createKanbanGroup)
       .get("/group/:kanbanId", requireSignIn, getKanbanGroups);

router.post("/task", requireSignIn, createKanbanTask)
.get("/task/:groupId", requireSignIn, getTaskListByGroup);

router.get("/task/status/list", requireSignIn, taskStatusList)

export default router;
