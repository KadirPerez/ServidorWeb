// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador usuarioController desde el archivo correspondiente en el directorio de controladores
const usuarioController = require('../controladores/usuarioController');

// Define la ruta GET para obtener todos los usuarios, manejada por la función getAllUsuarios del controlador
router.get('/', usuarioController.getAllUsuarios);

// Define la ruta GET que acepta un parámetro de ID para obtener un usuario específico, manejada por la función getUsuarioById del controlador
router.get('/:id', usuarioController.getUsuarioById);

router.post('/', usuarioController.postUsuario);

router.delete('/:id', usuarioController.deleteUsuario);

router.put('/:id', usuarioController.putUsuario);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;
