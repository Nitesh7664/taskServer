const express = require('express')
const router = express.Router()

const {addStudent, editStudent, getAllStudentInClass} = require('../controller/student')

router.post('/addStudent', addStudent)

router.patch('/editStudent', editStudent)

router.get('/getStudents/:classCode', getAllStudentInClass)

module.exports = router