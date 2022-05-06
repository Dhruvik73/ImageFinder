const mongoose= require('mongoose')

const imageschema=new mongoose.Schema({
    image:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:Date,default:Date.now}
})
mongoose.models={}
export default mongoose.model('imageschema',imageschema)