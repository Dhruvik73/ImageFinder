import user from "../../models/user"
import connect from "../../middleware/connect"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const handler=async (req,res)=>{
    if (req.method=='POST'){
        const myuser=await user.findOne({email:req.body.email})
       if(myuser){
        const pass=await bcrypt.compare(req.body.password,myuser.password)
        if(pass){
            const sec='beautyofyoungsociety'
            const token=jwt.sign(myuser.email,sec)
            res.json({pass,token})
        }
        else{
            res.json({pass})
        }
       }
       else{
         res.json({error:'enter correct email'})
       }
}
}
export default connect(handler)