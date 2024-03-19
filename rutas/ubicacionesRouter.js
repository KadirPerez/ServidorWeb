const express = require('express')
const router = express.Router();
const ubicacionController = require('../controladores/ubicacionController') 

router.get('/', ubicacionController.getAllUbicaciones)
router.get('/:id', ubicacionController.getUbicacionesById)
router.post('/', ubicacionController.createNewUbicacion)
router.delete('/:id', ubicacionController.deleteUbicacion)
router.put('/:id', ubicacionController.putUbicacion)

module.exports = router;