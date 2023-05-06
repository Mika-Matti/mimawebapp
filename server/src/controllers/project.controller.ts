import { Request, Response } from "express";
import { OkPacket } from "mysql2";
import { Project } from "../models/project.model";
import { db } from "../utils/db";

// route POST '/projects/'
export const createProject = async (req: Request, res: Response) => {
  console.log("TODO: implement createProject-method");
};

// route GET '/projects/'
export const getProjects = async (req: Request, res: Response) => {
  try {
    const results: Project[] = await db.query("SELECT * FROM projects");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route GET '/projects/:id'
export const getProjectById = async (req: Request, res: Response) => {
  const projectId: string = req.params.id;
  try {
    const result: Project[] = await db.query(
      "SELECT * FROM projects WHERE project_id = ?",
      [projectId]
    );
    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route PUT '/projects/:id'
export const updateProject = async (req: Request, res: Response) => {
  const projectId: string = req.params.id;
  const updatedProject: Project = req.body;
  try {
    const results: OkPacket = await db.query(
      "UPDATE projects SET ? WHERE project_id = ?",
      [updatedProject, projectId]
    );
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Project not found or no changes made" });
    } else {
      const project: Project = {
        ...updatedProject,
        project_id: parseInt(projectId),
      };
      res.status(200).json(project);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route DELETE '/projects/:id'
export const deleteProject = async (req: Request, res: Response) => {
  console.log("TODO: implement deleteProject-method");
};
