import { Database } from "../database.js";

const database = new Database();

export const changeComplete = async (req, res) => {
  const { id } = req.params;
  const data = {
    completed_at: null,
  };

  const task = await database.select("tasks", { id });

  if (task.length == 0)
    return res
      .writeHead(404)
      .end(JSON.stringify({ message: "Task not Found" }));

  if (!task[0].completed_at) data.completed_at = new Date();

  await database.update("tasks", id, data);

  return res.writeHead(204).end();
};
