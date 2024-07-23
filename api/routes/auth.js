const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../model/auth');
const mongoose= require('mongoose');
const jwt=require('jsonwebtoken')

//user signup
router.post('/user/signup',(req,res)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err)
    {
        return res.status(500).json({
            error:err
        })
    }
    else{
        const user=new User({
            _id:new mongoose.Types.ObjectId,
            fullName:req.body.fullName,
            email:req.body.email,
            password:hash
        }) 
        user.save()
        .then(result=>{
            res.status(200).json({
                newUser:result
            })
        })
        .catch(error=>{
            console.log(err)
            res.status(500).json({
                error:error
            })
        })
    }
})
})
 //user login

 router.post('/user/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(user=>{
        console.log(user)
        if(user.length<1){
            return res.status(404).json({
                message:"user not found"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                })
            }
            const token=jwt.sign({
              email:user[0].email,
              fullName:user[0].fullName,
                userType:'admin'

            },
        'i am yakku',
        {
            expiresIn:'365d'
        }
        )
        res.status(200).json({
            email:user[0].email,
            fullName:user[0].fullName,
            token:token
        })

        })

    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
 })

// admin login
router.post('/admin/login',(req,res)=>{
    if(req.body.userName=='yakshita123' && req.body.password=='123456')
    {
        const token=jwt.sign({
            email:'yak@gmail.com',
            fullName:'Yakshita Sharma',
            userType:'admin'

          },
      'i am yakku',
      {
          expiresIn:'365d'
      }
      )
    return res.status(200).json({
           email:'yak@gmail.com',
        fullName:'Yakshita Sharma',
          token:token
      })
    }
    res.status(404).json({
        msg:'bad request'
    })
})



module.exports=router;