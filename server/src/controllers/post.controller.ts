import { Request, Response } from "express";
import { OkPacket } from "mysql2";
import { Post } from "../models/post.model";
import { db } from "../utils/db";
import { sanitizeHTML, getTimeStamp } from "../utils/formatUtils";
import { JwtPayload } from "jsonwebtoken";

export interface ExtendedRequest extends Request {
  decodedToken?: JwtPayload;
}

// route POST '/posts'
export const createPost = async (req: ExtendedRequest, res: Response) => {
  const newPost: Post = req.body;
  if (req.body.post_date) {
    newPost.post_date = getTimeStamp();
  }
  //Use ExtendedRequest to insert user_id to post.
  if (req.decodedToken) {
    newPost.user_id = req.decodedToken.userId;
  }

  try {
    const result: OkPacket = await db.query("INSERT INTO posts SET ?", [
      newPost,
    ]);
    const insertedPost: Post = {
      post_id: result.insertId,
      ...newPost,
    };
    res.status(201).json(insertedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route GET '/posts/public' Only return public posts
export const getPublicPosts = async (req: Request, res: Response) => {
  let limit: string = "";
  if (req.query != undefined && req.query.limit && req.query.fromRow) {
    limit = ` LIMIT ${req.query.fromRow},${req.query.limit}`;
  }
  try {
    const results: Post[] = await db.query(
      "SELECT * FROM posts WHERE post_is_public = true ORDER BY post_date DESC" +
        limit
    );
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route GET '/posts/all Authenticated can return all posts.
export const getAllPosts = async (req: Request, res: Response) => {
  let limit: string = "";
  if (req.query != undefined && req.query.limit && req.query.fromRow) {
    limit = ` LIMIT ${req.query.fromRow},${req.query.limit}`;
  }
  try {
    const results: Post[] = await db.query(
      "SELECT * FROM posts ORDER BY post_date DESC" + limit
    );
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route GET '/posts/public/:id'
export const getPublicPostById = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  try {
    const result: Post[] = await db.query(
      "SELECT * FROM posts WHERE post_id = ? AND post_is_public = true",
      [postId]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Encode html in content text
    const post: Post = result[0];
    post.post_content = sanitizeHTML(post.post_content);

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route GET '/posts/all/:id'
export const getAnyPostById = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  try {
    const result: Post[] = await db.query(
      "SELECT * FROM posts WHERE post_id = ?",
      [postId]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Encode html in content text
    const post: Post = result[0];
    post.post_content = sanitizeHTML(post.post_content);

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route PUT '/posts/all/:id'
export const updatePost = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const updatedPost: Post = req.body;
  try {
    // Keep datetime unchanged.
    if (req.body.post_date) {
      const existingPost = await db.query(
        "SELECT post_date FROM posts WHERE post_id = ?",
        [postId]
      );
      updatedPost.post_date = existingPost[0].post_date;
    }
    const results: OkPacket = await db.query(
      "UPDATE posts SET ? WHERE post_id = ?",
      [updatedPost, postId]
    );
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Post not found or no changes made" });
    } else {
      const post: Post = {
        ...updatedPost,
        post_id: parseInt(postId),
      };
      res.status(200).json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route DELETE '/posts/all/:id'
export const deletePost = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  try {
    const result: OkPacket = await db.query(
      "DELETE FROM posts WHERE post_id = ?",
      [postId]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "Post not found or no rows were affected" });
    } else {
      res.status(204).send(); // Success
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
