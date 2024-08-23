import express from "express";
import {
  createKanbanBoard,
  getKanbanById,
  getMyKanbanBoards,
  createKanbanGroup,
  getKanbanGroups,
  createKanbanTask,
  taskStatusList,
  getTaskListByGroup,
  deleteGroupTask,
  deleteTask
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
router.get("/task/:groupId", requireSignIn, getTaskListByGroup);

router.get("/task/status/list", requireSignIn, taskStatusList);

router.delete("/task/:taskId",requireSignIn,deleteTask);
router.delete("/group/:groupId",requireSignIn,deleteGroupTask);

router.put("/task/:taskId",requireSignIn,deleteGroupTask);

export default router;
