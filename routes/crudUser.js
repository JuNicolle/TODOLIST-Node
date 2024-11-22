const express = require('express');
const bdd = require('../bdd');
const router = express.Router();



// route creation utilisateur entre le code et la BDD 
router.post('/createUser', (req, res) => {
    const {nameUser, mailUser,passwordUser} = req.body;
    const insertUser = "INSERT INTO users (nameUser, mailUser, passwordUser) VALUES (?,?,?);"
    bdd.query(insertUser, [nameUser,mailUser,passwordUser], (error)=>{
        if(error) throw error;
        res.send('Utilisateur créé avec succès !');
        // res.redirect('http://localhost:5173/createUser');
    });
});

// route lecture des utilisateurs 
router.get('/readUser', (req, res) => {
    const readUser = "SELECT * FROM users;"
    bdd.query(readUser, (error, results)=>{
        if(error) throw error;
        res.json(results);
    });
});

//route lecteur d'un utilisateur par son ID
router.get('/readUserById/:idUser', (req, res) => {
    const {idUser} = req.params;
    const readUser = "SELECT * FROM users WHERE idUser = ?;"
    bdd.query(readUser, [idUser], (error, results)=>{
        if(error) throw error;
        res.json(results);
    });
});

// route mise à jour des utilisateurs
router.post('/updateUser/:idUser', (req, res) => {
    const {nameUser, mailUser,passwordUser} = req.body;
    // les accolades ci dessus renvoient un fichier json 
    const {idUser} = req.params;
    const updateUser = "UPDATE users SET nameUser = ?, mailUser = ?, passwordUser = ? WHERE idUser = ?;"
    bdd.query(updateUser,[nameUser, mailUser,passwordUser, idUser], (error, results)=>{
        if (error) throw error;
        res.json(results);
        // res.redirect('../update.html');
    });
});

// route suppression des utilisateurs
router.post('/deleteUser/:idUser', (req, res) => {
    const { idUser } = req.params;

    const deleteUser = "DELETE FROM users WHERE idUser = ?;";
    bdd.query(deleteUser, [idUser], (error, results) => {
        if (error) throw error;
        res.json(results);
        // res.redirect('/read.html');
    });
});

module.exports = router;