const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//Congifuracion
app.set('port', process.env.PORT || 3000); // Configuracion del puerto
app.set('view engine', 'ejs'); //Motor de plantilla
app.set('views', path.join(__dirname, '../app/views')); //Asignacion de la ruta para las plantillas

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(__dirname + '/public')); //Rutas Estaticas
app.use( express.static( path.join(__dirname, '../public') ) );
module.exports = app;
