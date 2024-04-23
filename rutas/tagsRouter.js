// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador tagController desde el archivo correspondiente en el directorio de controladores
const tagController = require('../controladores/tagController');

// Define la ruta GET para obtener todos los tag, manejada por la función getAllTags del controlador
router.get('/', tagController.getAllTags);

// Define la ruta GET que acepta un parámetro de ID para obtener un tag específico, manejada por la función getTagById del controlador
router.get('/:id', tagController.getTagById);

router.post('/', tagController.postTag);

router.delete('/:id', tagController.deleteTag);

router.put('/:id', tagController.putTag);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;

