const express = require('express')
const router = express.Router();
const responsableController = require('../controladores/responsableController') 

router.get('/', responsableController.getAllResponsables)
router.get('/:id', responsableController.getResponsablesById)
router.post('/', responsableController.createNewResponsable)
router.delete('/:id', responsableController.deleteResponsable)
router.put('/:id', responsableController.putResponsable)

module.exports = router;