const mongoose=require("mongoose")
const studentSchema=new mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
   
});
const Student=mongoose.model("students",studentSchema);
module.exports=Student;