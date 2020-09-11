const mongoose=require("mongoose");



const postSchema=new mongoose.Schema({
    title:{
        required:true,
        unique:true,
        type:String
    },
    body:{
        required:true,
        unique:false,
        type:String
    },

},{timestamps:true})


module.exports=mongoose.model("Post",postSchema);