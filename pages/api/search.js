import image from "../../models/image";
import connect from "../../middleware/connect";

const handler=async (req,res)=>{
   if(req.method=='POST'){
    const a=[]
    const data=await image.find({category:req.body.search})
    const data1=await image.find({desc:req.body.search})
   res.json({data,data1})
   }
   else{
       res.status(400).json('error')
   }
}

export default connect(handler)