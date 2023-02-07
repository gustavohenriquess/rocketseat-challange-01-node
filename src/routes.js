import { buildRoutePath } from "./utils/build-route-path.js";

import { createTask } from "./use-case/create-task.js";
import { getTasks } from "./use-case/get-tasks.js";
import { updateTasks } from "./use-case/update-task.js";
import { deleteTask } from "./use-case/delete-task.js";
import { changeComplete } from "./use-case/change-complete.js";

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: createTask,
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: getTasks,
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: updateTasks,
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: deleteTask,
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: changeComplete,
  },
];
