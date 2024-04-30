// Importa el módulo Express para crear la aplicación
const express = require('express');

// Crea un enrutador utilizando el método Router() de Express
const router = express.Router();

// Importa el controlador tagController desde el archivo correspondiente en el directorio de controladores
const tagController = require('../controladores/tagController');

router.get('/', tagController.getAllTags);

router.get('/:id', tagController.getTagById);

router.get('/tag/:tag', tagController.getTagByTag);

router.get('/:id/activos', tagController.getMisActivos);

router.post('/', tagController.postTag);

router.delete('/:id', tagController.deleteTag);

router.put('/:id', tagController.putTag);

router.put('/:idTag/activo/:idActivo', tagController.addActivo)

router.put('/:idTag/borrarActivo/:idActivo', tagController.deleteActivo)

module.exports = router;

