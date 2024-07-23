const express=require('express')
const router=express.Router()
const Comment=require('../model/comment')
const mongoose=require('mongoose');
const checkAuth=require('../middleware/checkAuth')

//post new comment
router.post('/',checkAuth,(req,res)=>{
const newComment=new Comment({
    _id:new mongoose.Types.ObjectId,
    email:req.body.email,
    commentText:req.body.commentText,
    blogId:req.body.blogId

})
newComment.save()
.then(result=>{
res.status(200).json({
    new_Comment:result
})
})
.catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
})
})

// get all comment
router.get('/',checkAuth,(req,res)=>{
    Comment.find()
    .select('_id email commentText')
    .then(result=>{
        res.status(200).json({
            comment:result
        })
       
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



//delete comment by id
router.delete('/:id',checkAuth,(req,res)=>{
    Comment.deleteOne({_id:req.params.id})
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


//count all comment for any blog
router.get('/get/count/:blogId',checkAuth,(req,res)=>{
    Comment.find({blogId:req.params.blogId}).countDocuments()
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