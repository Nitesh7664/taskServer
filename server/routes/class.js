const express = require('express')
const router = express.Router()

const {addClass, getClass} = require('../controller/class')

router.post('/createClass', addClass)

router.get('/getClass/:classCode', getClass)

module.exports = router