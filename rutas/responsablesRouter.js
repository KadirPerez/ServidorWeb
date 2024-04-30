const express = require('express');

const router = express.Router();

const responsableController = require('../controladores/responsableController');

router.get('/', responsableController.getAllResponsables);

router.get('/:id', responsableController.getResponsablesById);

router.get('/numEmpleado/:numEmpleado', responsableController.getResponsablesByNumEmpleado);

router.get('/nombre/:nombre', responsableController.getResponsablesByNombre);

router.get('/:id/activos', responsableController.getActivos);

router.post('/', responsableController.postResponsable);

router.delete('/:id', responsableController.deleteResponsable);

router.put('/:id', responsableController.putResponsable);

module.exports = router;
