const mongoose=require('mongoose');
categorySchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   //unique id set by mongoose
      name:String,
      imageUrl:String,
    
})


module.exports=mongoose.model('Category',categorySchema);