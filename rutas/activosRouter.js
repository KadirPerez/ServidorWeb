const express = require('express');
const router = express.Router();
const activoController = require('../controladores/activoController');
const miPassport = require('../controladores/passportController')

router.get('/', miPassport.passport.authenticate('jwt', { session: false }), activoController.getAllActivos);

router.get('/:id', miPassport.passport.authenticate('jwt', { session: false }), activoController.getActivosById);

router.get('/numSerie/:serie', miPassport.passport.authenticate('jwt', { session: false }), activoController.getActivosBySerie);

router.get('/descripcion/:descripcion', miPassport.passport.authenticate('jwt', { session: false }), activoController.getActivosByDescripcion);

router.get('/:id/tags', miPassport.passport.authenticate('jwt', { session: false }), activoController.getTags);

router.post('/', miPassport.passport.authenticate('jwt', { session: false }), activoController.postActivo);

router.delete('/:id', miPassport.passport.authenticate('jwt', { session: false }), activoController.deleteActivo);

router.put('/:id', miPassport.passport.authenticate('jwt', { session: false }), activoController.putActivo);

router.put('/:idActivo/borrarTag/:idTag', miPassport.passport.authenticate('jwt', { session: false }), activoController.deleteTag);

router.put('/:id/borrarResponsable', miPassport.passport.authenticate('jwt', { session: false }), activoController.deleteResponsable);

router.put('/:id/borrarUbicacion', miPassport.passport.authenticate('jwt', { session: false }), activoController.deleteUbicacion);

router.put('/:idActivo/responsable/:numEmpleado', miPassport.passport.authenticate('jwt', { session: false }), activoController.addResponsable);

router.put('/:idActivo/ubicacion/:idUbicacion', miPassport.passport.authenticate('jwt', { session: false }), activoController.addUbicacion);

router.put('/:idActivo/tag/:idTag', miPassport.passport.authenticate('jwt', { session: false }), activoController.addTag);

module.exports = router;