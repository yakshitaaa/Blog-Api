const express=require('express')
const router=express.Router()
const Category=require('../model/category')
const mongoose=require('mongoose');
const checkAuth=require('../middleware/checkAuth')


//post category by admin
router.post('/',(req,res)=>{
const newCategory=new Category({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    imageUrl:req.body.imageUrl

})
newCategory.save()
.then(result=>{
res.status(200).json({
    new_Category:result
})
})
.catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
})
})

// get all category
router.get('/',(req,res)=>{
    Category.find()
    .select('_id name imageUrl')
    .then(result=>{
        res.status(200).json({
            category:result
        })
       
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



//delete category by id
router.delete('/:id',(req,res)=>{
    Category.deleteOne({_id:req.params.id})
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

//update category
router.put('/:id',(req,res)=>{
    Category.updateOne({_id:req.params.id},req.body)
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

//count all category
router.get('/get/count',(req,res)=>{
    Category.find().countDocuments()
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