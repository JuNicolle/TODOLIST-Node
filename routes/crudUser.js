const express = require("express");
const bdd = require("../bdd");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// route creation utilisateur entre le code et la BDD
router.post("/createUser", async (req, res) => {
  const { nameUser, mailUser, passwordUser } = req.body;

  const hashedPassword = await bcrypt.hash(passwordUser, 5);

  const insertUser =
    "INSERT INTO users (nameUser, mailUser, passwordUser, role) VALUES (?,?,?,?);";
  bdd.query(insertUser, [nameUser, mailUser, hashedPassword, "user"], (error) => {
    if (error) throw error;
    res.send("Utilisateur créé avec succès !");
    // res.redirect('http://localhost:5173/createUser');
  });
});

// route pour comparer le mot de passe entré par l'utilisateur avec celui enregistré dans la BDD
router.post("/loginUser", (req, res) => {
  const { mailUser, passwordUser } = req.body;

  // Vérification des données envoyées
  if (!mailUser || !passwordUser) {
    return res.json({ error: "Email et mot de passe sont requis." });
  }

  const checkUser =
    "SELECT idUser,mailUser, passwordUser FROM users WHERE mailUser = ?;";

  bdd.query(checkUser, [mailUser], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      console.log(user);
      bcrypt.compare(passwordUser, user.passwordUser, (err, result) => {
        if (err) throw err;
        if (result) {
          const token = jwt.sign({ id: user.idUser, email: user.mailUser, role : user.role }, "secretkey", {
            expiresIn: "1h",
          });
          res.json({ token });
        } else {
          res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }
      });
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  });
});

// Comparer les mots de passe
//         if (passwordUser === user.passwordUser) {
//             return res.send("Connexion réussie"); // RETURN pour arrêter l'exécution
//         } else {
//             return res.send("Mot de passe incorrect"); // RETURN pour arrêter l'exécution
//         }
//     });
// });

// route lecture des utilisateurs
router.get("/readUser", (req, res) => {
  const readUser = "SELECT * FROM users;";
  bdd.query(readUser, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//route lecteur d'un utilisateur par son ID
router.get("/readUserById/:idUser", (req, res) => {
  const { idUser } = req.params;
  const readUser = "SELECT * FROM users WHERE idUser = ?;";
  bdd.query(readUser, [idUser], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// route mise à jour des utilisateurs
router.post("/updateUser/:idUser", (req, res) => {
  const { nameUser, mailUser, passwordUser } = req.body;
  // les accolades ci dessus renvoient un fichier json
  const { idUser } = req.params;
  const updateUser =
    "UPDATE users SET nameUser = ?, mailUser = ?, passwordUser = ? WHERE idUser = ?;";
  bdd.query(
    updateUser,
    [nameUser, mailUser, passwordUser, idUser],
    (error, results) => {
      if (error) throw error;
      res.json(results);
      // res.redirect('../update.html');
    }
  );
});

// route suppression des utilisateurs
router.post("/deleteUser/:idUser", (req, res) => {
  if (req.role !== "admin") {
    return res.status(401).send("Vous n'avez pas les droits pour supprimer un utilisateur");
  }
  const { idUser } = req.params;

  const deleteUser = "DELETE FROM users WHERE idUser = ?;";
  bdd.query(deleteUser, [idUser], (error, results) => {
    if (error) throw error;
    res.json(results);
    // res.redirect('/read.html');
  });
});

module.exports = router;
