import { Database } from "../database.js";

const database = new Database();

export const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const data = {};

  if (!title && !description) {
    return res
      .writeHead(400)
      .end(JSON.stringify({ message: "Title or Description are required" }));
  }

  const task = await database.select("tasks", { id });

  if (task.length == 0)
    return res
      .writeHead(404)
      .end(JSON.stringify({ message: "Task not Found" }));

  if (title) data.title = title;
  if (description) data.description = description;

  await database.update("tasks", id, data);

  return res.writeHead(204).end();
};
