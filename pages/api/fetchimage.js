import image from "../../models/image"
import connect from "../../middleware/connect"
const handler=async (req,res)=>{
   if(req.method=='POST'){
      const data=await image.find({category:req.body.category})
      if(data){res.json(data)}
      else{
          res.json({error:'no image found'})
      }
   }
}
export default connect(handler)