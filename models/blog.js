const mongoose=require('mongoose')

const blog=new mongoose.Schema({
    desc:{type:String,required:true},
    image:{type:String,required:true},
    title:{type:String,required:true},
    category:{type:String,required:true},
    time:{type:Date,default:Date.now}
})
mongoose.models={}
export default mongoose.model('blog',blog)