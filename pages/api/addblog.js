import blog from "../../models/blog";
import connect from '../../middleware/connect'

const handler=async (req,res)=>{
   if(req.method=="POST"){
   const myblog=await blog({
    desc:req.body.desc,
    image:req.body.image,
    title:req.body.title,
    category:req.body.category
   })
   await myblog.save()
   res.json(myblog)
}
else{
    res.json('error')
}
}
export default connect(handler)