// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador activoController desde el archivo correspondiente en el directorio de controladores
const activoController = require('../controladores/activoController');

// Define la ruta GET para obtener todos los activos
router.get('/', activoController.getAllActivos);

// Define la ruta GET para obtener por id
router.get('/:id', activoController.getActivosById);

// Define la ruta GET para obtener por número de serie 
router.get('/numSerie/:serie', activoController.getActivosBySerie);

// Define la ruta post 
router.post('/', activoController.postActivo);

router.delete('/:id', activoController.deleteActivo);

router.put('/:id', activoController.putActivo);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;

