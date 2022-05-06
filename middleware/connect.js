const mongoose=require('mongoose')

const connect=handler =>async(req,res)=>{
    if(!mongoose.connections[0].readyState){
       mongoose.connect('mongodb://localhost:27017/imagefinder',handler)
       return handler(req,res)
    }
     return handler(req,res)
}
 export default connect