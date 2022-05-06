import user from "../../models/user"
import connect from "../../middleware/connect"
const handler=async (req,res)=>{
    if (req.method=='POST'){
        const myuser=await user.findOne({email:req.body.email})
       if(myuser){
       res.json(myuser)
        }
        else{
            res.json({error:'you need to login'})
        }
       }
       else{
         res.json({error:'enter correct email'})
       }
}
export default connect(handler)