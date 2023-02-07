import { randomUUID } from "node:crypto";
import { Database } from "../database.js";

const database = new Database();

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .writeHead(400)
      .end(JSON.stringify({ message: "Title and Description are required" }));
  }

  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
  };

  await database.insert("tasks", task);

  return res.writeHead(201).end();
};
