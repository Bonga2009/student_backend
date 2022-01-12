import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import StudentModel from "./schema/student_schema.js";

//configuring dotenv
dotenv.config();

//creating an express server
const app=express();

//using the cors middleware to get the body of request in json format
app.use(cors());
app.use(express.json());

//assigning port number to server
const port=6000;

//assigning database url to variable
const db=process.env.DB_URL

//creating a new student
app.post('/student', async(req, res)=>{
    const{first_name,last_name,date_of_birth,school}=req.body;
    console.log('New student record has been created',{first_name,last_name,date_of_birth,school})
    const studentModel = await StudentModel.create({
        first_name,
        last_name,
        date_of_birth,
        school,
    })
    if(studentModel){
        return res.status(201).json({
            status:true,
            message:"Student profile created successfully",
            data:studentModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message:'Student profile was not successfully created'
        })
    }
    
})
//Getting all students
 app.get('/student', async (req, res)=>{
    const {status} = req.params
    console.log('New student created', status);
    const studentModel = await StudentModel.find().limit(3);
    if(studentModel){
        return res.status(201).json({
            status:true,
            message:"student profile fetch successfully",
            data:studentModel
        })
    } else{
        return res.status(400).json({
            status:false,
            message:"student profile was not fetched",
        })
    }
});

  //connecting to MongoDB database
mongoose.connect(db,{
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to db');
}).catch((error)=>{console.log(error);})


app.listen(port,()=>{console.log('server is connected and running')});