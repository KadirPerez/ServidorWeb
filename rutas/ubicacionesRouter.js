const express = require('express');

const router = express.Router();

const ubicacionController = require('../controladores/ubicacionController');

router.get('/', ubicacionController.getAllUbicaciones);

router.get('/:id', ubicacionController.getUbicacionesById);

router.get('/descripcion/:descripcion', ubicacionController.getUbicacionesByDescripcion);

router.get('/:id/activos', ubicacionController.getActivos);

router.post('/', ubicacionController.postUbicacion);

router.delete('/:id', ubicacionController.deleteUbicacion);

router.put('/:id', ubicacionController.putUbicacion);

router.get('/:id/activos', ubicacionController.getActivos);

module.exports = router;

