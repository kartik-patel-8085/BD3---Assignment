const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function adTaskList(taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  let result = adTaskList(taskId, text, priority);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

function sortByPriority(a, b) {
  return a.priority - b.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortByPriority);
  res.json({ tasks: result });
});

function editTaskPriority(taskId, priority) {
  let result;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].priority = priority;
      result = tasks;
    }
  }
  return result;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = req.query.taskId;
  let priority = req.query.priority;
  let result = editTaskPriority(taskId, priority);
  res.json({ tasks: result });
});

function editText(taskId, text) {
  let result;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = text;
      result = tasks;
    }
  }
  return result;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let result = editText(taskId, text);
  res.json({ tasks: result });
});

function deleteTask(taskObj, taskId) {
  return taskObj.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = req.query.taskId;
  let result = tasks.filter((taskObj) => deleteTask(taskObj, taskId));
  res.json({ tasks: result });
});

function filterTaskByPriority(taskObj, priority) {
  return taskObj.priority == priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = req.query.priority;
  let result = tasks.filter((taskObj) =>
    filterTaskByPriority(taskObj, priority)
  );
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
