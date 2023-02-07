import { Database } from "../database.js";

const database = new Database();

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await database.select("tasks", { id });

  if (task.length == 0)
    return res
      .writeHead(404)
      .end(JSON.stringify({ message: "Task not Found" }));

  await database.delete("tasks", id);

  return res.writeHead(204).end();
};
