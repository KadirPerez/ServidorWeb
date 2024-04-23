// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador responsableController desde el archivo correspondiente en el directorio de controladores
const responsableController = require('../controladores/responsableController');
const { rmSync } = require('fs');

// Define la ruta GET para obtener todos los responsables, manejada por la función getAllResponsables del controlador
router.get('/', responsableController.getAllResponsables);

// Define la ruta GET que acepta un parámetro de ID para obtener un responsable específico, manejada por la función getResponsablesById del controlador
router.get('/:id', responsableController.getResponsablesById);

router.post('/', responsableController.postResponsable);

router.delete('/:id', responsableController.deleteResponsable);

router.put('/:id', responsableController.putResponsable);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;
