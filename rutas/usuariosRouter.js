const express = require('express');

const router = express.Router();

const usuarioController = require('../controladores/usuarioController');

router.get('/', usuarioController.getAllUsuarios);

router.get('/:id', usuarioController.getUsuarioById);

router.post('/', usuarioController.postUsuario);

router.delete('/:id', usuarioController.deleteUsuario);

router.put('/:id', usuarioController.putUsuario);

module.exports = router;
