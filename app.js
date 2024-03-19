// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto en el que se ejecutará el servidor
const port = 4000;

// Importa los enrutadores para activos, ubicaciones y responsables
const activosRouter = require('./rutas/activosRouter');
const ubicacionesRouter = require('./rutas/ubicacionesRouter');
const responsablesRouter = require('./rutas/responsablesRouter');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta de inicio del servidor
app.get('/', (req, res) => {
    res.send('Servidor gestor de activos');
});

// Asocia los enrutadores a rutas específicas
app.use('/activos', activosRouter);
app.use('/ubicaciones', ubicacionesRouter);
app.use('/responsables', responsablesRouter);

// Inicia el servidor y escucha las solicitudes en el puerto especificado
app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});

