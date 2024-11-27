const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');
const bodyParser = require('body-parser');
const crudUser = require('./routes/crudUser');
const chemin= require('path');
const crudTask = require('./routes/crudTask');
const loginCheck = require('./routes/loginCheck');
const cors = require('cors');



app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(cors());



app.use(express.static(chemin.join(__dirname, 'front')));

app.use('/todolist', tasksRoutes, crudUser, crudTask);

app.use('/todolist/user', crudUser);
app.use('/todolist/task', crudTask);


app.listen( 3000 , () => {
    console.log('Serveur lancé sur le port 3000');
});