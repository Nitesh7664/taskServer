const mongoose = require('mongoose')
const Class = require('../models/Class')
const Enrollment = require('../models/Enrollment')

const addClass = async (req, res) => {

   const {className, classCode, teacher, startDate, endDate} = req.body
   console.log("entered")
   try{
      
      const classExist = await Class.findOne({classCode})
      if(classExist) return res.status(409).json({message: `class having classcode ${classCode} already exists`})

      const newClass = new Class({
         className,
         classCode,
         teacher,
         startDate,
         endDate
      })
      const savedClass = await newClass.save()

       const enrollment = new Enrollment({
          class: savedClass.id
       })
       const savedEnrollment = await enrollment.save()
       const classWithEnrollment = await Class.updateOne({classCode}, {enrollment: savedEnrollment.id})
       console.log(savedEnrollment.id, savedClass.id)

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