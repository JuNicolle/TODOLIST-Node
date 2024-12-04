const express = require("express");
const bdd = require("../bdd");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

// route creation tasks
router.post("/createTask", auth.authentification, (req, res) => {
  console.log(req.userMail, req.userId);
  const { nameTask, descriptionTask } = req.body;
  const insertTask =
    "INSERT INTO tasks (nameTask, descriptionTask, userTask) VALUES (?,?,?);";
  bdd.query(
    insertTask,
    [nameTask, descriptionTask, req.userId],
    (error, results) => {
      if (error) throw error;
      res.json(results);
      // res.redirect('http://localhost:5173/createUser');
    }
  );
});

// route lecture des utilisateurs
router.get("/readTask", auth.authentification, (req, res) => {
  const readTasks = "SELECT * FROM tasks WHERE userTask = ?;";
  bdd.query(readTasks, [req.userId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Route pour récupérer les tâches d'un utilisateur connecté
router.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  bdd.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Route pour mettre à jour l'état d'une tâche
router.get("/tasks", auth.authentification, (req, res) => {
  const sql = "";
  if (req.role === "admin") {
    sql = "SELECT * FROM tasks";
  } else {
    sql = "SELECT * FROM tasks WHERE userTask = ?";
  }

  bdd.query(sql, [req.userId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// route validation d'une tâche
router.post("/validateTask/:idTask", (req, res) => {
  const { idTask } = req.params;
  const newState = 2;

  const updateState = "UPDATE tasks SET idState = ? WHERE idTask = ?";
  bdd.query(updateState, [newState, idTask], (error, results) => {
    if (error) throw error;
    res.json({ message: "Task updated successfully", results });
  });
});

// route suppression des utilisateurs
router.delete("/deleteTask/:idTask", (req, res) => {
  const { idTask } = req.params;

  const deleteTask = "DELETE FROM tasks WHERE idTask = ?;";
  bdd.query(deleteTask, [idTask], (error, results) => {
    if (error) throw error;
    res.json(results);
    // res.redirect('/read.html');
  });
});

module.exports = router;
