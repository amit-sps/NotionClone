import documentsModel from "../models/documentsModel.js";
import mongoose from "mongoose";

export const getBlogPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const quantity = parseInt(req.params.quantity) || 5;

    const blogPosts = await documentsModel.aggregate([
      { $match: { adminId: id, isPublished: true } },
      { $sample: { size: quantity } }, // Randomly select the specified number of documents
    ]);
    if (blogPosts.length < 0) {
      return res.status(404).send({
        success: false,
        message: "blogPosts not found.",
        data: [],
      });
    }

    return res.status(200).send({
      success: false,
      message: "blogPosts document fetched successfully",
      data: blogPosts,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the document",
    });
    console.log(err);
  }
};
