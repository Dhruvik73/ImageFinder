import React from 'react'
import image from '../../models/image'
import user from '../../models/user'
import Link from 'next/link'
function Slug({myimage}) {
  return (
    <div><div className="album py-5 bg-light">
    <div className="container">
    <h5 style={{color:'purple',marginBottom:30+'px'}}>Your all image of Your preffer choices is show on your display 👍</h5>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    {myimage.map((k)=>{return <div key={k._id} className="card shadow-sm">
            <img src={k.image}/>
            <div className="card-body">
              <p className="card-text">{k.desc.slice(0,50)}</p>
              <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                        <Link href={k.image}><a className="btn btn-sm btn-outline-secondary">View</a></Link>
                      </div>
                <small className="text-muted">{k.date.slice(0,10)}</small>
              </div>
            </div>
          </div>})}
        </div>
        </div></div></div>
  )
}
export async function getServerSideProps(context) {
  const email=context.query.slug
  const User=await user.find({email:email})
  const newuser=await JSON.parse(JSON.stringify(User))
  const userchoices= await newuser[0].choices
  const myimage=await image.find({category:userchoices})
  var allimage=await JSON.parse(JSON.stringify(myimage))
  return {
    props: {myimage:JSON.parse(JSON.stringify(allimage))}, // will be passed to the page component as props
  }}
export default Slug