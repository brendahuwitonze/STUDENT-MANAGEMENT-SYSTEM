import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';
import facilatatorModel from './models/facilatator.model.js';

const app = express();
const port = process.env.PORT || 3000;
  const db_connection_string = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management-system';//process.env.MONGODB_URI;
app.use(express.json());
app.post("/student/add", (req, res)=> {
    StudentModel.create(req.body)
    .then((addedStudent) => {
        console.log(addedStudent);
        res.status(201).json({ 
            message: "Student added!", 
            student: addedStudent
        });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    })
});

app.get("/student/list", async(req, res)=> {
    try {
        const allStudents = await StudentModel.find();
        res.status(200).json({ 
            message: "All students retrieved!", 
            students: allStudents 
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving students!" 
        });
    }
});

app.delete('/student/delete/:id', async(req,res)=>{
    try {
        const deleteStudent = await StudentModel.deleteOne(
            {_id: req.params.id})
            res.status(200).json({
                message:"Dleted successufully",
                student: deleteStudent
            });
    } catch (error) {
        res.status(500).json({
            message:" Error in deleting"
        });
    }
 });

// UPDATE A STUDENTS INFO
app.put('/student/update/:id',async (req,res)=>{
    const{phone}= req.body
   let updatedStudent = await StudentModel.findByIdAndUpdate({_id:req.params.id},{$set:phone},{new: true});
   if(!updatedStudent){
       res.status(3000).json({message:'Failed to update student'});
   }else{
       res.status(200).json(updatedStudent);
   }
 });

// facilatator
app.post("/facilatator/add", (req, res)=> {
    facilatatorModel.create(req.body)
    .then((addedfacilatator) => {
        console.log(addedfacilatator);
        res.status(201).json({ 
            message: "facilatator added!", 
            facilatator: addedfacilatator
        });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    })
});

app.get("/facilatator/list", async(req, res)=> {
    try {
        const allfacilatators = await facilatatorModel.find();
        res.status(200).json({ 
            message: "All students retrieved!", 
            facilatator: allfacilatators
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving students!" 
        });
    }
});

app.delete('/facilatator/delete/:id', async(req,res)=>{
    try {
        const deletefacilatator = await facilatatorModel.findByIdAndDelete(
            {_id: req.params.id})
            res.status(200).json({
                message:"Dleted successufully",
                facilatator: deletefacilatator
            });
    } catch (error) {
        res.status(500).json({
            message:" Error in deleting"
        });
    }
 });

// UPDATE A facilatator INFO
app.put('/facilatator/update/:id',async (req,res)=>{
    const{phone}= req.body
   let updatedfacilatator= await facilatatorModel.findByIdAndUpdate({_id:req.params.id},{$set:phone},{new: true});
   if(!updatedfacilatator){
       res.status(3000).json({message:'Failed to update student'});
   }else{
       res.status(200).json(updatedfacilatator);
   }
 });

mongoose.connect(db_connection_string)
.then(() => {
    console.log("Connected to DB...");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});