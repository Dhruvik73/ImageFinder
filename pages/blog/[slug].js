import React from 'react'
import blog from '../../models/blog'
function Slug({myblog}) {
    console.log(myblog)
  return (
    <div><div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
    <img src={myblog.image} style={{height:50+'vh',width:60+'vw'}}/>
      <h1 class="display-4 fw-normal">{myblog.title}</h1>
      <p class="lead fw-normal">{myblog.desc}</p>
  </div>
    </div>
  )
}
export async function getServerSideProps(context){
    const id=await context.query.slug
    const myblog=await blog.findById(id)
    return{
        props:{myblog:JSON.parse(JSON.stringify(myblog))}
    }
}
export default Slug