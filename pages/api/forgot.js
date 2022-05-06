import user from "../../models/user";
import connect from '../../middleware/connect'
import bcrypt from 'bcrypt'
const handler=async (req,res)=>{
 if(req.method=='POST'){
     try{
        const solt=await bcrypt.genSalt(10)
        const secpass=await bcrypt.hash(req.body.password,solt)
        const myuser=await user.findOneAndUpdate({email:req.body.email},{password:secpass})
        if(myuser){
            res.json({success:'success'})
        }
        else{
            res.json({error:'error'})
        }
     } catch(error){
         res.json({error})
     }
 
 }
 else{
     res.json({error:'error'})
 }
}
export default connect(handler)