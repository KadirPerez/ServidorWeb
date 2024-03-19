const express = require('express')
const router = express.Router();
const activoController = require('../controladores/activoController') 

router.get('/', activoController.getAllActivos)
router.get('/:id', activoController.getActivosById)
router.get('/numSerie:serie', activoController.getActivosBySerie);
router.post('/', activoController.createNewActivo)
router.delete('/:id', activoController.deleteActivo)
router.put('/:id', activoController.putActivo)

module.exports = router;