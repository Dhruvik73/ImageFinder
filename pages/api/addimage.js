import images from "../../models/image"
import connect from "../../middleware/connect"

const handler=async (req,res)=>{
    if(req.method=="POST"){
        for(var i=0;i<req.body.length;i++){
            const myimage=new images({
            image:req.body[i].image,
            desc:req.body[i].desc,
            category:req.body[i].category
          })
          await myimage.save()
        }
          res.status(200).json('success')
    }
  
}
export default connect(handler)

  