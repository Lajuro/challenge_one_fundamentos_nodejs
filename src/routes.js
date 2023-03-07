import TaskController from "./controllers/TaskController.js";
import { buildRoutePath } from './utils/build-route-path.js';

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: TaskController.create
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: TaskController.read
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: TaskController.update
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: TaskController.complete
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: TaskController.delete
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks'),
    handler: TaskController.deleteAll
  }
];