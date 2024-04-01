// Se importan las librerías necesarias
const express = require('express'); // Express para crear el servidor
const app = express(); // Se crea la aplicación Express
const cors = require('cors'); // Middleware para permitir CORS
const fs = require("fs"); // Librería para manejar archivos del sistema
const https = require("https"); // Módulo para crear servidores HTTPS

// Se define el puerto en el que escuchará el servidor
process.env.port = 4000;

// Se leen los archivos de la clave privada y el certificado para HTTPS
const llavePrivada = fs.readFileSync("./clave.key");
const certificado = fs.readFileSync("./certificado.crt");

// Se crean las credenciales para el servidor HTTPS
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "Kadir" // Contraseña de la llave privada usada en la creación del certificado
};

// Se crea el servidor HTTPS utilizando las credenciales y la aplicación Express
const httpsServer = https.createServer(credenciales, app);

// Se importan los enrutadores para diferentes rutas
const activosRouter = require('./rutas/activosRouter');
const ubicacionesRouter = require('./rutas/ubicacionesRouter');
const responsablesRouter = require('./rutas/responsablesRouter');

// Se agregan middlewares a la aplicación Express
app.use(cors()); // Middleware para permitir CORS
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Ruta de inicio para comprobar el funcionamiento del servidor
app.get('/', (req, res) => {
    res.send('Servidor gestor de activos');
});

// Se asignan los enrutadores a diferentes rutas
app.use('/activos', activosRouter);
app.use('/ubicaciones', ubicacionesRouter);
app.use('/responsables', responsablesRouter);

// El servidor HTTPS comienza a escuchar en el puerto definido
httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});