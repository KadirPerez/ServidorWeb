const express = require('express');
const miPassport = require('../controladores/passportController')
const router = express.Router();

const usuarioController = require('../controladores/usuarioController');

router.get('/', miPassport.passport.authenticate('jwt', { session: false }), usuarioController.getAllUsuarios);

router.get('/:id', miPassport.passport.authenticate('jwt', { session: false }), usuarioController.getUsuarioById);

router.post('/', miPassport.passport.authenticate('jwt', { session: false }), usuarioController.postUsuario);

router.delete('/:id', miPassport.passport.authenticate('jwt', { session: false }), usuarioController.deleteUsuario);

router.put('/:id', miPassport.passport.authenticate('jwt', { session: false }), usuarioController.putUsuario);

module.exports = router;
