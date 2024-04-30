const express = require('express');

const router = express.Router();

const activoController = require('../controladores/activoController');

router.get('/', activoController.getAllActivos);

router.get('/:id', activoController.getActivosById);

router.get('/numSerie/:serie', activoController.getActivosBySerie);

router.get('/descripcion/:descripcion', activoController.getActivosByDescripcion);

router.get('/:id/tags', activoController.getTags);

router.post('/', activoController.postActivo);

router.delete('/:id', activoController.deleteActivo);

router.put('/:id', activoController.putActivo);

router.put('/:idActivo/borrarTag/:idTag', activoController.deleteTag);

router.put('/:id/borrarResponsable', activoController.deleteResponsable);

router.put('/:id/borrarUbicacion', activoController.deleteUbicacion);

router.put('/:idActivo/responsable/:numEmpleado', activoController.addResponsable);

router.put('/:idActivo/ubicacion/:idUbicacion', activoController.addUbicacion);

router.put('/:idActivo/tag/:idTag', activoController.addTag);

module.exports = router;