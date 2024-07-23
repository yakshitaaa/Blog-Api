const express=require('express');
const app=express();
const mongoose=require('mongoose');
const blogRoute=require('./api/routes/blog');
const categoryRoute=require('./api/routes/category')
const bodyParser=require('body-parser');
const {urlencoded,json}=require('body-parser')
const authRoute=require('./api/routes/auth')
const commentRoute=require('./api/routes/comment')

mongoose.connect('mongodb+srv://sharmayakshita55:yakshita@yakshita.4yr33hp.mongodb.net/?retryWrites=true&w=majority&appName=yakshita');
mongoose.connection.on('connected',()=>{
    console.log('connected with database')
})
mongoose.connection.on('error',(err)=>{
    console.log('connection fail')
    console.log(err)
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/blog',blogRoute)
app.use('/category',categoryRoute)
app.use('/auth',authRoute)
app.use('/comment',commentRoute)

app.use((req,res)=>{
    res.status(200).json({
        msg:'bad request'
    })
})
module.exports=app;