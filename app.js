const express = require('express') 
const app = express() 
const port = 4000

const activosRouter = require('./rutas/activosRouter');
const ubicacionesRouter = require('./rutas/ubicacionesRouter');
const responsablesRouter = require('./rutas/responsablesRouter');

app.use(express.json());

app.get('/', (req, res) => {res.send('Servidor gestor de activos')});

app.use('/activos', activosRouter);
app.use('/ubicaciones', ubicacionesRouter);
app.use('/responsables', responsablesRouter);

app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port)
}).on('error', err => {
    console.log('Error al inciar el servidor:', err)
})