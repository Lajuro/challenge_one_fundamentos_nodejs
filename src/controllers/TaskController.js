import Task from "../models/Task.js";

class TaskController {
  create(req, res) {
    const { database } = req;
    const { title, description } = req.body;

    if (!title) {
      return res
        .writeHead(400)
        .end(JSON.stringify({ error: "'title' should be provided" }));
    }

    if (!description) {
      return res
        .writeHead(400)
        .end(JSON.stringify({ error: "'description' should be provided" }));
    }

    const task = new Task(title, description);

    database.insert("tasks", task);

    return res
      .writeHead(201)
      .end(JSON.stringify(task));
  }

  read(req, res) {
    const { database } = req;

    const task = database.select("tasks");

    if (!task) {
      return res
        .writeHead(404)
        .end(JSON.stringify({ error: "Task not found" }));
    }

    return res.end(JSON.stringify(task));
  }

  update(req, res) {
    const { database } = req;
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      return res
        .writeHead(400)
        .end(JSON.stringify({ error: "'title or 'description' should be provided" }));
    }

    const task = database.select_by_id("tasks", id);

    if (!task) {
      return res
        .writeHead(404)
        .end(JSON.stringify({ error: "Task not found" }));
    }

    console.log(task, title, description);

    const updatedTask = {
      ...task,
      title: title || task.title,
      description: description || task.description,
      updated_at: new Date(),
    };

    database.update("tasks", id, updatedTask);

    return res.end(JSON.stringify(updatedTask));
  }

  complete(req, res) {
    const { database } = req;
    const { id } = req.params;

    const task = database.select_by_id("tasks", id);

    if (!task) {
      return res
        .writeHead(404)
        .end(JSON.stringify({ error: "Task not found" }));
    }

    if (task.completed_at) {
      task.completed_at = null;
    } else {
      task.completed_at = new Date();
    }

    database.update("tasks", id, task);

    return res.end(JSON.stringify(task));
  }

  delete(req, res) {
    const { database } = req;
    const { id } = req.params;

    const task = database.select_by_id("tasks", id);

    if (!task) {
      return res
        .writeHead(404)
        .end(JSON.stringify({ error: "Task not found" }));
    }

    database.delete("tasks", id);

    return res.end(JSON.stringify(task));
  }

  deleteAll(req, res) {
    const { database } = req;

    const tasks = database.select("tasks");

    let message = "";

    if (tasks.data.length > 0) {
      if (tasks.data.length === 1) {
        message = "1 task deleted";
      } else {
        message = `${ tasks.data.length } tasks deleted`;
      }
      database.delete_all("tasks");
    } else {
      message = "No tasks to delete";
    }

    return res.end(JSON.stringify({ message }));
  }
}

export default new TaskController();