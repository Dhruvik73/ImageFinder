const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    choices:{type:Array,required:true}
})
mongoose.models={}
export default mongoose.model('user',userschema)