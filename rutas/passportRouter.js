const express = require('express')
const router = express.Router()
const miPassport = require('../controladores/passportController')

router.post('/login', miPassport.generateJwtToken)

module.exports = router;