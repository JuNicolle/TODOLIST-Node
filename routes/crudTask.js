const express = require('express');
const bdd = require('../bdd');
const router = express.Router();


// route creation tasks
router.post('/createTask', (req, res) => {
    const {nameTask, descriptionTask} = req.body;
    const insertTask = "INSERT INTO tasks (nameTask, descriptionTask) VALUES (?,?);"
    bdd.query(insertTask, [nameTask, descriptionTask], (error)=>{
        if(error) throw error;
        res.send('Tâche créée avec succès !');
        // res.redirect('http://localhost:5173/createUser');
    });
});

// route lecture des utilisateurs 
router.get('/readTask', (req, res) => {
    const readTasks = "SELECT * FROM tasks;"
    bdd.query(readTasks, (error, results)=>{
        if(error) throw error;
        res.json(results);
    });
});

// route mise à jour des utilisateurs
router.post('/updateTask/:idTask', (req, res) => {
    const {nameTask, descriptionTask} = req.body;
    // les accolades ci dessus renvoient un fichier json 
    const {idTask} = req.params;
    const updateTask = "UPDATE tasks SET nameTask = ?, descriptionTask = ? WHERE idTask = ?;"
    bdd.query(updateTask,[nameTask, descriptionTask, idTask], (error, results)=>{
        if (error) throw error;
        res.json(results);
        // res.redirect('../update.html');
    });
});

// route suppression des utilisateurs
router.post('/deleteTask/:idTask', (req, res) => {
    const { idTask } = req.params;

    const deleteTask = "DELETE FROM tasks WHERE idTask = ?;";
    bdd.query(deleteTask, [idTask], (error, results) => {
        if (error) throw error;
        res.json(results);
        // res.redirect('/read.html');
    });
});

module.exports = router;