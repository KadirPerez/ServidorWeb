const express = require('express');
const miPassport = require('../controladores/passportController')
const router = express.Router();

const tagController = require('../controladores/tagController');

router.get('/', miPassport.passport.authenticate('jwt', { session: false }), tagController.getAllTags);

router.get('/:id', miPassport.passport.authenticate('jwt', { session: false }), tagController.getTagById);

router.get('/tag/:tag', miPassport.passport.authenticate('jwt', { session: false }), tagController.getTagByTag);

router.get('/:id/activos', miPassport.passport.authenticate('jwt', { session: false }), tagController.getMisActivos);

router.post('/', miPassport.passport.authenticate('jwt', { session: false }), tagController.postTag);

router.delete('/:id', miPassport.passport.authenticate('jwt', { session: false }), tagController.deleteTag);

router.put('/:id', miPassport.passport.authenticate('jwt', { session: false }), tagController.putTag);

router.put('/:idTag/activo/:idActivo', miPassport.passport.authenticate('jwt', { session: false }), tagController.addActivo)

router.put('/:idTag/borrarActivo/:idActivo', miPassport.passport.authenticate('jwt', { session: false }), tagController.deleteActivo)

module.exports = router;

