const shortid = require('shortid')

const Class = require('../models/Class')
const Enrollment = require('../models/Enrollment')

const addClass = async (req, res) => {

   const {canvasSection, subject, teacher, startDate, endDate, canvasCourse, canvasAddress} = req.body
   console.log("entered")
   try{
      const classCode = shortid.generate()   

      const newClass = new Class({
         canvasSection,
         classCode,
         subject,
         canvasCourse,
         canvasAddress,
         teacher,
         startDate,
         endDate
      })
      const savedClass = await newClass.save()

       const enrollment = new Enrollment({
          class: savedClass.id
       })
       const savedEnrollment = await enrollment.save()
       const classWithEnrollment = await Class.findOneAndUpdate({classCode}, {enrollment: savedEnrollment.id}, {new: true})

      return res.status(201).send(classWithEnrollment)

   }catch(err){
      console.log(err)
      res.status(400).json({message: "some error occured"})
   }
}

const getClass = async (req, res) => {

   const classCode = req.params.classCode;

   try{
      const classExist = await Class.findOne({classCode})
      if(!classExist) return res.status(400).json({message: `class with classCode ${classCode} does not exist`})

      res.status(200).json(classExist)

   }catch(err){

   }
}


module.exports = {
   addClass,
   getClass
}