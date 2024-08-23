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
    console.log("inside the task ");
    await KanbanTaskModel.create(taskToSave);
    console.log("inside the taskToSave ", taskToSave);
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

export const getTaskListByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "groupId is required.",
      });
    }
    const tasks = await KanbanTaskModel.find({ group: groupId });
    const tasksByStatus = tasks.reduce((acc, task) => {
      const status = task.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {});
    return res.status(201).json({
      success: true,
      message: "Kanban task by status fetch successfully.",
      data: tasksByStatus,
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

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "taskId is required.",
      });
    }
    const task = await KanbanTaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found.",
      });
    }

    await KanbanTaskModel.findByIdAndDelete({_id:taskId});
    return res.status(201).json({
      success: true,
      message: "Kanban task Deleted successfully.",
    });
  } catch (error) {
    console.error("Error to fetch Kanban task status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Kanban task .",
      error: error.message,
    });
  }
};

export const deleteGroupTask = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "groupId is required.",
      });
    }

    const group = await kanbanGroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found.",
      });
    }

    await kanbanGroupModel.findByIdAndDelete(groupId);
    await KanbanTaskModel.deleteMany({ group: groupId });

    return res.status(200).json({
      success: true,
      message: "Kanban group and associated tasks deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Kanban group and tasks:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Kanban group and tasks.",
      error: error.message,
    });
  }
};
