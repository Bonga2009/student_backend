//importing mongoose library to our file
import mongoose from "mongoose";


const {Schema, model}=mongoose

//creating a variable for our schema
const studentSchema=Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required:true
    },
    date_of_birth:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        required:false,
        default:false
    }

})

const studentModel=model('students', studentSchema)

export default studentModel
