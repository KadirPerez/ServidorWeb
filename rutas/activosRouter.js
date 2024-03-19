// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador activoController desde el archivo correspondiente en el directorio de controladores
const activoController = require('../controladores/activoController');

// Define la ruta GET para obtener todos los activos, manejada por la función getAllActivos del controlador
router.get('/', activoController.getAllActivos);

// Define la ruta GET que acepta un parámetro de ID para obtener un activo específico, manejada por la función getActivosById del controlador
router.get('/:id', activoController.getActivosById);

// Define la ruta GET que acepta un parámetro de número de serie para obtener activos por número de serie, manejada por la función getActivosBySerie del controlador
router.get('/numSerie/:serie', activoController.getActivosBySerie);

// Define la ruta POST para crear un nuevo activo, manejada por la función createNewActivo del controlador
router.post('/', activoController.createNewActivo);

// Define la ruta DELETE para eliminar un activo según su ID, manejada por la función deleteActivo del controlador
router.delete('/:id', activoController.deleteActivo);

// Define la ruta PUT para actualizar un activo según su ID, manejada por la función putActivo del controlador
router.put('/:id', activoController.putActivo);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;

