
const mysql = require('mysql2');



const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_manager",
    port: 3307
});

connexion.connect((error) => {
    if (error) throw error;
    console.log('Connexion à la base de données réussie !');
});

module.exports = connexion;