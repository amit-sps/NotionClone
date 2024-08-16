import mongoose from "mongoose";

const kanbanTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    assign: {
      type: String,
    },
    teamspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "document",
    },
    category: {
      type: String,
      enum: ["Todo", "Inprogress", "Compelete"],
      default: "Todo",
    },
    status: {
      type: String,
      enum: ["Not started", "In development", "Testing", "Reviewing", "Done"],
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
    deadline: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    document:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "document"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("kanbanTask", kanbanTaskSchema);
