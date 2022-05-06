import user from "../../models/user";
import connect from "../../middleware/connect";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const handler=async (req,res)=>{
    const seckey='beautyofyoungsociety'
   if(req.method=='POST'){
    const solt=await bcrypt.genSalt(10)
    const secpass=await bcrypt.hash(req.body.password,solt)
       const myuser=new  user({
        name:req.body.name,
        email:req.body.email,
        password:secpass,
        choices:req.body.choices
       })
       await myuser.save()
       const token=jwt.sign(myuser.email,seckey)
       res.status(200).json({token:token,email:myuser.email})
   }
   else{
       res.json({error:'error'})
   }
}
export default connect(handler)

