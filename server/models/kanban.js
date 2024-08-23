import mongoose from "mongoose";
import { KanbanTaskStatus } from "../utils/constant.js";

const kanbanSchema = new mongoose.Schema(
  {
    name: String,
    teamspace: {
      type: mongoose.Types.ObjectId,
      ref: "document",
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const kanbanGroupSchema = new mongoose.Schema(
  {
    name: String,
    teamspace: {
      type: mongoose.Types.ObjectId,
      ref: "document",
      default: null,
    },
    kanban: {
      type: mongoose.Types.ObjectId,
      ref: "kanban",
      require: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { timestamps: true }
);

const kanbanTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(KanbanTaskStatus),
      default: KanbanTaskStatus.Todo,
    },
    assigned: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    startDate: {
      type: Date,
      require: false,
    },
    endDate: {
      type: Date,
      require: false,
    },
    taskContent: {
      type: String,
      default: "",
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: "kanbanGroup",
      required: true,
    },
    kanban: {
      type: mongoose.Types.ObjectId,
      ref: "kanban",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const kanbanModel = mongoose.model("kanban", kanbanSchema);
export const kanbanGroupModel = mongoose.model(
  "kanbanGroup",
  kanbanGroupSchema
);
export const KanbanTaskModel = mongoose.model("KanbanTask", kanbanTaskSchema);
