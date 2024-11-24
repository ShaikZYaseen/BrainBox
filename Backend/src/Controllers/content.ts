import { Request, Response } from "express";
import { Content } from "../Models/content";

const addContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { link, type, title }: any = req.body;

    if (!link || !type || !title) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    await Content.create({
      link,
      type,
      title,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json({ message: "Content added" });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ message: "An error occurred while adding content" });
  }
};

const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Content ID is required" });
      return;
    }

    //@ts-ignore
    const userId = req.userId;

    const content = await Content.findOneAndDelete({ _id: id, userId });

    if (!content) {
      res.status(404).json({ message: "Content not found or not authorized to delete" });
      return;
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ message: "An error occurred while deleting content" });
  }
};

const getContent = async (req: Request, res: Response): Promise<void> => {
  try {
    //@ts-ignore
    const userId = req.userId;

    const content = await Content.find({ userId });

    if (!content || content.length === 0) {
      res.status(404).json({ message: "No content found for the user" });
      return;
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "An error occurred while fetching content" });
  }
};

export { addContent, deleteContent, getContent };
