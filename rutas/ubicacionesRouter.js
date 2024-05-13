const express = require('express');
const miPassport = require('../controladores/passportController')
const router = express.Router();

const ubicacionController = require('../controladores/ubicacionController');

router.get('/', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.getAllUbicaciones);

router.get('/:id', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.getUbicacionesById);

router.get('/descripcion/:descripcion', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.getUbicacionesByDescripcion);

router.get('/:id/activos', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.getActivos);

router.post('/', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.postUbicacion);

router.delete('/:id', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.deleteUbicacion);

router.put('/:id', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.putUbicacion);

router.get('/:id/activos', miPassport.passport.authenticate('jwt', { session: false }), ubicacionController.getActivos);

module.exports = router;

