const express=require('express')
const router=express.Router()
const Blog=require('../model/blog')
const mongoose=require('mongoose');
const checkAdmin=require('../middleware/checkAdmin')


//post blog by admin
router.post('/',checkAdmin,(req,res)=>{
const newBlog=new Blog({
    _id:new mongoose.Types.ObjectId,
    title:req.body.title,
    category:req.body.category,
    description:req.body.description,
    imageUrl:req.body.imageUrl

})
newBlog.save()
.then(result=>{
res.status(200).json({
    new_blog:result
})
})
.catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
})
})

// get all blog
router.get('/',(req,res)=>{
    Blog.find()
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
       
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get blog by id
router.get('/:id',(req,res)=>{
    Blog.find({_id:req.params.id})
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
//get blog by category
router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category})
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//delete blog by id
router.delete('/:id',checkAdmin,(req,res)=>{
    Blog.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            deletedData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//update blog
router.put('/:id',checkAdmin,(req,res)=>{
    Blog.updateOne({_id:req.params.id},req.body)
    .then(result=>{
        res.status(200).json({
            updatedData:result
        })
    })
    .catch((err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    }))
})

//count all blog
router.get('/get/count',(req,res)=>{
    Blog.find().countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports=router;