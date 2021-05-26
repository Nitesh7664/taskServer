const express = require('express')
const router = express.Router()

const {addStudent, editStudent} = require('../controller/student')

router.post('/addStudent', addStudent)

router.patch('/editStudent', editStudent)

module.exports = router