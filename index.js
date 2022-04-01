import express from 'express';
import router from './routes/index.js';
import { db } from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

// Conectar la BD
db.authenticate()
    .then(() => console.log('BD conectada'))
    .catch(error => error);

// Iniciamos la aplicación
const app = express();

// Definimos el puerto
// const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Middleware para obtener el año actual
app.use((req, res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear(); 

    return next();
});

// Agregar body parser para leer datos del formulario
app.use(express.urlencoded({encoded : true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// app.listen(port, () => {
//     console.log(`Servidor corriendo en el puerto ${port}`);
// });

// PUERTO Y HOST PARA LA APP
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '4000';
app.listen(port, host, () => {
    console.log(`El servidor está funcionando en el puerto ${port} y host ${host}`);
})