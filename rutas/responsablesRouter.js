const express = require('express');
const miPassport = require('../controladores/passportController')
const router = express.Router();

const responsableController = require('../controladores/responsableController');

router.get('/', miPassport.passport.authenticate('jwt', { session: false }), responsableController.getAllResponsables);

router.get('/:id', miPassport.passport.authenticate('jwt', { session: false }), responsableController.getResponsablesById);

router.get('/numEmpleado/:numEmpleado', miPassport.passport.authenticate('jwt', { session: false }), responsableController.getResponsablesByNumEmpleado);

router.get('/nombre/:nombre', miPassport.passport.authenticate('jwt', { session: false }), responsableController.getResponsablesByNombre);

router.get('/:id/activos', miPassport.passport.authenticate('jwt', { session: false }), responsableController.getActivos);

router.post('/', miPassport.passport.authenticate('jwt', { session: false }), responsableController.postResponsable);

router.delete('/:id', miPassport.passport.authenticate('jwt', { session: false }), responsableController.deleteResponsable);

router.put('/:id', miPassport.passport.authenticate('jwt', { session: false }), responsableController.putResponsable);

module.exports = router;
