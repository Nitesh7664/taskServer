const bcrypt = require('bcryptjs')

const Student = require('../models/Student')
const Class = require('../models/Class')
const Enrollment = require('../models/Enrollment')

const addStudent = async (req, res) => {

   const {name, username, password, classCode} = req.body

   try{

      const classExist = await Class.findOne({classCode})
      if(!classExist) return res.status(404).json({message: `class with classCode: ${classCode} not found`})

      const studentExist = await Student.findOne({username})
      if(studentExist) return res.status(409).json({message: `student with username: ${username} already exist`})

      const hashedPassword = await bcrypt.hash(password, 12)
      const newStudent = new Student({
         name,
         username,
         password: hashedPassword
      })

      const savedStudent = await newStudent.save()
      const updatedEnrollment = await Enrollment.updateOne({_id: classExist.enrollment}, {$push: {students: savedStudent._id}})
      const updatedStudentWithEnrollment = await Student.updateOne({username}, {$push: {enrollments: classExist.enrollment}})

      res.status(201).json({student: updatedStudentWithEnrollment, enrollment: updatedEnrollment})



   }catch(err){
      res.status(400).json({message: 'some error occured'})
   }

}

const editStudent = async (req, res) => {

   const {name, username, password, classCode} = req.body
   
   try{

      const userExist = await Student.findOne({username})
      if(!userExist) return res.status(404).json({message: `could not found user with username ${username}`})

      const classExist = await Class.findOne({classCode})
      if(!classExist) return res.status(404).json({message: `could not found the class for the username ${username}`})

      const hashedPassword = await bcrypt.hash(password, 12)

      const updatedStudent = await Student.updateOne({username}, {name, password: hashedPassword})

      res.status(200).json(updatedStudent)

   }catch(err){
      console.log(err)
      res.status(400).json({message: 'error'})
   }

}



module.exports = {
   addStudent,
   editStudent
}