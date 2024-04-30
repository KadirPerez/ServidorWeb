// Se importan las librerías necesarias
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require("fs")
const https = require("https")
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '1gb' }));

process.env.port = 4000;

const llavePrivada = fs.readFileSync("./clave.key");
const certificado = fs.readFileSync("./certificado.crt");

const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "Kadir" 
};

const httpsServer = https.createServer(credenciales, app);

const activosRouter = require('./rutas/activosRouter');
const ubicacionesRouter = require('./rutas/ubicacionesRouter');
const responsablesRouter = require('./rutas/responsablesRouter');
const tagsRouter = require('./rutas/tagsRouter');
const usuariosRouter = require('./rutas/usuariosRouter');

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Servidor gestor de activos');
});

app.use('/activo', activosRouter);
app.use('/ubicacion', ubicacionesRouter);
app.use('/responsable', responsablesRouter);
app.use('/tag', tagsRouter);
app.use('/usuario', usuariosRouter);

httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});