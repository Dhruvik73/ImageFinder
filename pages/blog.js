import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
function Blog() {
    const [blog, setblog] = useState([])
    const fetchblog=async()=>{
        const email=jwt.verify(localStorage.getItem('user'),'beautyofyoungsociety') 
        const user=await fetch('http://localhost:3000/api/getuser',{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email})
      })
        const myuser=await user.json()
        const data=await fetch('http://localhost:3000/api/fetchblog',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({category:myuser.choices})
        })
        var blogs=await data.json()
        return blogs
            }
    useEffect( () => {
        fetchblog().then((result)=>{
          if(result.error){
            setblog([])
            
          }
          else{setblog(result)}
        })
    }, [])
    console.log(blog)
  return (
    <div>   
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Album example</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
          </div>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {setblog.length==0&&<h5 style={{color:'purple'}}>No blogs of your choices to show..</h5>}
            {blog.map((k)=>{return setblog.length!=0&&<div key={k._id} className="col">
              <h5 style={{color:'purple'}}>this blog is about {k.category}</h5>
              <div className="card shadow-sm">
                <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={k.image}/>
                <div className="card-body">
                <p className="card-text">{k.title}</p>
                  <p className="card-text">{k.desc}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link href={`/blog/${k._id}`}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></Link>
                    </div>
                    <small className="text-muted">Date:{k.time.slice(0,10)}<br/>Time:{k.time.slice(15,19)}</small>
                  </div>
                </div>
              </div>
            </div> })}
          </div>
        </div>
      </div>
    
    </main>
    </div>
  )
}
export default Blog