// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador ubicacionController desde el archivo correspondiente en el directorio de controladores
const ubicacionController = require('../controladores/ubicacionController');

// Define la ruta GET para obtener todas las ubicaciones, manejada por la función getAllUbicaciones del controlador
router.get('/', ubicacionController.getAllUbicaciones);

// Define la ruta GET que acepta un parámetro de ID para obtener una ubicación específica, manejada por la función getUbicacionesById del controlador
router.get('/:id', ubicacionController.getUbicacionesById);

router.post('/', ubicacionController.postUbicacion);

router.delete('/:id', ubicacionController.deleteUbicacion);

router.put('/:id', ubicacionController.putUbicacion);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;

