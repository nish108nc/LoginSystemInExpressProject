const express=require("express")
const bcrypt=require("bcrypt")
const Student=require("./models/student-model")
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/LoginSystem")
.then(()=>{
    console.log("Connected to MongoDB");
    
})
.catch(()=>{
    console.log("Not Connected to MongoDB");
})
const app=express()

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})
app.get('/',(req,res)=>{
    res.send("Login System.")
})
app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/login',async(req,res)=>{
   
    const email=req.body.email;
    const password=req.body.password;

    const student=await Student.findOne({email:email})
    if(!student){
        return res.send("Invalid email or password")
    }

    const isMatch=await bcrypt.compare(password,student.password)

    if(isMatch){
        res.render("welcome",{student})
    }
    else{
        res.send("Wrong email or password..")
    }
})

app.get('/welcome',(req,res)=>{
    res.render("welcome")
})
app.get('/register',(req,res)=>{
    res.render("register")
})

app.post('/register',async(req,res)=>{
    
    try{
        const first_name=req.body.first_name;
        const last_name=req.body.last_name;
        const email=req.body.email;
        const password=req.body.password;

        const hashPassword=await bcrypt.hash(password,10)

        const student=await Student.create({
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:hashPassword
        })
        res.render("login")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})