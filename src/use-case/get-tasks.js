import { Database } from "../database.js";

const database = new Database();

export const getTasks = async (req, res) => {
  const { id, search } = req.query;

  const filter = {};
  if (id) filter.id = id;
  if (search) {
    filter.title = search;
    filter.description = search;
  }

  const tasks = await database.select("tasks", filter);

  return res.writeHead(200).end(JSON.stringify(tasks));
};
