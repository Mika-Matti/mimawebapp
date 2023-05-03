import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { db } from "../utils/db";

// route '/projects/'
export const createProject = async (req: Request, res: Response) => {
  console.log("TODO: implement createProject-method");
};

// route '/projects/'
export const getProjects = async (req: Request, res: Response) => {
  try {
    const results: Project[] = await db.query("SELECT * FROM projects");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route '/projects/:id'
export const getProjectById = async (req: Request, res: Response) => {
  console.log("TODO: implement getProjectById-method");
};

// route '/projects/:id'
export const updateProject = async (req: Request, res: Response) => {
  console.log("TODO: implement updateProject-method");
};

// route '/projects/:id'
export const deleteProject = async (req: Request, res: Response) => {
  console.log("TODO: implement deleteProject-method");
};
