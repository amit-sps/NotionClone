import {
  KanbanTaskModel,
  kanbanGroupModel,
  kanbanModel,
} from "../models/kanban.js";
import { KanbanTaskStatus } from "../utils/constant.js";

export const createKanbanBoard = async (req, res) => {
  try {
    const { name, teamspace } = req.body;
    const newKanban = new kanbanModel({
      name,
      teamspace,
      createdBy: req?.user?.id,
    });

    await newKanban.save();

    return res.status(201).json({
      success: true,
      message: "Kanban board created successfully.",
      data: newKanban,
    });
  } catch (error) {
    console.error("Error creating Kanban board:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Kanban board.",
      error: error.message,
    });
  }
};

export const getMyKanbanBoards = async (req, res) => {
  try {
    const kanbanBoards = await kanbanModel
      .find({ createdBy: req?.user?.id, teamspace: null })
      .lean();
    return res.status(201).json({
      success: true,
      message: "Kanban board fetch successfully.",
      data: kanbanBoards,
    });
  } catch (error) {
    console.error("Error to get Kanban boards:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get Kanban boards.",
      error: error.message,
    });
  }
};

export const getKanbanById = async (req, res) => {
  try {
    const kanbanBoard = await kanbanModel
      .findById(req?.params?.kanbanId)
      .lean();
    return res.status(201).json({
      success: true,
      message: "Kanban board fetch successfully.",
      data: kanbanBoard,
    });
  } catch (error) {
    console.error("Error to get Kanban boards:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get Kanban boards.",
      error: error.message,
    });
  }
};

export const createKanbanGroup = async (req, res) => {
  try {
    const { name, kanban, teamspace } = req.body;
    const newKanbanGroup = new kanbanGroupModel({
      name,
      kanban,
      teamspace,
      createdBy: req?.user?.id,
    });

    await newKanbanGroup.save();

    return res.status(201).json({
      success: true,
      message: "Kanban group created successfully.",
      data: newKanbanGroup,
    });
  } catch (error) {
    console.error("Error to create Kanban group:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Kanban group.",
      error: error.message,
    });
  }
};

export const getKanbanGroups = async (req, res) => {
  try {
    const kanbanGroups = await kanbanGroupModel
      .find({ kanban: req?.params?.kanbanId, createdBy: req?.user?.id })
      .lean();

    return res.status(201).json({
      success: true,
      message: "Kanban board fetch successfully.",
      data: kanbanGroups,
    });
  } catch (error) {
    console.error("Error to fetch Kanban group:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Kanban group.",
      error: error.message,
    });
  }
};

export const createKanbanTask = async (req, res) => {
  try {
    const taskToSave = new KanbanTaskModel({
      title: req?.body?.title || "Untitled",
      status: req?.body?.status,
      group: req?.body?.group,
      kanban: req?.body?.kanban,
      createdBy: req?.user?.id,
    });
    await taskToSave.save();

    return res.status(201).json({
      success: true,
      message: "Kanban task created successfully.",
      data: taskToSave,
    });
  } catch (error) {
    console.error("Error to create Kanban task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Kanban task.",
      error: error.message,
    });
  }
};

export const taskStatusList = async (req, res) => {
  try {
    return res.status(201).json({
      success: true,
      message: "Kanban task status fetch successfully.",
      data: Object.values(KanbanTaskStatus),
    });
  } catch (error) {
    console.error("Error to fetch Kanban task status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Kanban task status.",
      error: error.message,
    });
  }
};

export const getTaskListByGroup = async (req,res) => {
  try {
    
  } catch (error) {
    console.error("Error to fetch Kanban task status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Kanban task status.",
      error: error.message,
    });
  }
}
