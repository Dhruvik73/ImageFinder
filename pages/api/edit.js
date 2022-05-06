import user from "../../models/user";
import connect from '../../middleware/connect'
const handler=async (req,res)=>{
 if(req.method=='POST'){
     try{
        const myuser=await user.findOneAndUpdate({email:req.body.email},{name:req.body.name,choices:req.body.choices})
        if(myuser){
            res.json({success:'success'})
        }
        else{
            res.json({error:'error'})
        }
     } catch(error){
         res.json({error:'error'})
     }
 
 }
 else{
     res.json({error:'error'})
 }
}
export default connect(handler)