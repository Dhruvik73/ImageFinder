import blog from "../../models/blog";
import connect from "../../middleware/connect";

const handler=async(req,res)=>{
if(req.method=="POST"){
    const myblog=await blog.find({category:req.body.category})
    if(myblog.length!=0){
        res.json(myblog)
    }
    else{
        res.json({error:'no blogs'})
    }
}
else{
    res.json('error')
}
}
export default connect(handler)