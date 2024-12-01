import { Request, Response } from "express";
import { Content } from "../Models/content";

// Add Content
const addContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { link, selectedType, title }: any = req.body;

    // Validate all required fields
    if (!link || !selectedType || !title) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    // Validate if `link` is a valid URL
    try {
      new URL(link); // Throws if the link is not valid
    } catch (_) {
      res.status(400).json({ success: false, message: "Invalid URL provided" });
      return;
    }

    const content = await Content.create({
      link,
      tags: selectedType,
      title,
      // @ts-ignore
      userId: req.userId,
    });

    res.json({ success: true, message: "Content added", content });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding content",
    });
  }
};

// Delete Content
const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "Content ID is required" });
      return;
    }

    //@ts-ignore
    const userId = req.userId;

    const content = await Content.findOneAndDelete({ _id: id, userId });

    if (!content) {
      res.status(404).json({
        success: false,
        message: "Content not found or not authorized to delete",
      });
      return;
    }

    res.json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({
      success: true,
      message: "An error occurred while deleting content",
    });
  }
};

// Get Content
const getContent = async (req: Request, res: Response): Promise<void> => {
  try {
    //@ts-ignore
    const userId = req.userId;

    const content = await Content.find({ userId });

    if (!content || content.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No content found for the user" });
      return;
    }

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching content",
    });
  }
};

// Share Content (Generate Shareable Link)
const shareContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Content ID is required to generate a shareable link",
      });
      return;
    }

    //@ts-ignore
    const userId = req.userId;

    const content = await Content.findOne({ _id: id, userId });

    if (!content) {
      res
        .status(404)
        .json({ message: "Content not found or not authorized to access" });
      return;
    }

    // Assuming a base URL for shareable links
    const baseUrl = "http://localhost:5173/share";
    const shareableLink = `${baseUrl}/${content._id}`;

    res.json({ message: "Shareable link generated", link: shareableLink });
  } catch (error) {
    console.error("Error generating shareable link:", error);
    res.status(500).json({
      message: "An error occurred while generating the shareable link",
    });
  }
};

// Handle Shareable Link (Access Content by ID)
const accessSharedContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ message: "Content ID is required to access shared content" });
      return;
    }

    const content = await Content.findById(id);

    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res.json({ message: "Content retrieved successfully", content });
  } catch (error) {
    console.error("Error retrieving shared content:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving shared content" });
  }
};

export {
  addContent,
  deleteContent,
  getContent,
  shareContent,
  accessSharedContent,
};
