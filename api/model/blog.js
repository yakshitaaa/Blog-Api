const mongoose=require('mongoose');
blogSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   //unique id set by mongoose
      title:String,
      description:String,
      imageUrl:String,
      category:String
})


module.exports=mongoose.model('Blog',blogSchema);