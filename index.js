const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');
const bodyParser = require('body-parser');
const crudUser = require('./routes/crudUser');
const chemin= require('path');
const crudTask = require('./routes/crudTask');



app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(chemin.join(__dirname, 'front')));

app.use('/todolist', tasksRoutes, crudUser, crudTask);


app.listen( 3000, () => {
    console.log('Serveur lancé sur le port 3000');
});