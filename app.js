// Importar el módulo express
const express = require('express')

// Crear una instancia de la aplicación express
const app = express()

// Definir el puerto
const port = 4001

// Importar controladores para activos, responsables y ubicaciones
const activoController = require('./controladores/activoController')
const responsableController = require('./controladores/responsableController')
const ubicacionController = require('./controladores/ubicacionController')

// Definir ruta principal
app.get('/', (req, res) => {
    res.send('Servidor gestor de activos')
});

// Rutas para obtener todos los activos, activos por ID y activos por número de serie
app.get('/activos', activoController.getAllActivos)
app.get('/activos:id', activoController.getActivosById)
app.get('/activos/numSerie:serie', activoController.getActivosBySerie);

// Rutas para obtener todos los responsables, responsables por ID
app.get('/responsables', responsableController.getAllResponsables)
app.get('/responsables:id', responsableController.getResponsablesById)

// Rutas para obtener todas las ubicaciones, ubicaciones por ID
app.get('/ubicaciones', ubicacionController.getAllUbicaciones)
app.get('/ubicaciones:id', ubicacionController.getUbicacionesById)

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Rutas para crear, eliminar y actualizar activos
app.post('/activos', activoController.createNewActivo)
app.delete('/activos:id', activoController.deleteActivo)
app.put('/activos:id', activoController.putActivo)

// Rutas para crear, eliminar y actualizar responsables
app.post('/responsables', responsableController.createNewResponsable)
app.delete('/responsables:id', responsableController.deleteResponsable)
app.put('/responsables:id', responsableController.putResponsable)

// Rutas para crear, eliminar y actualizar ubicaciones
app.post('/ubicaciones', ubicacionController.createNewUbicacion)
app.delete('/ubicaciones:id', ubicacionController.deleteUbicacion)
app.put('/ubicaciones:id', ubicacionController.putUbicacion)

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port)
}).on('error', err => {
    console.log('Error al inciar el servidor:', err)
})