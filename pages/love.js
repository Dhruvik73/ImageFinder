import React from 'react'
import image from '../models/image'
import styles from '../styles/Home.module.css'
function Love({myimage}) {
    return (
        <div className={styles.container}><main>
        <div className="album py-5 bg-light">
          <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {myimage.map((k)=>{return <div key={k._id} className="col">
                <div className="card shadow-sm">
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
                </div>
              </div>
              })} </div></div></div>
      
      </main></div>
      )
    }
    export async function getStaticProps(context) {
      const myimage=await image.find({category:'love'})
      return {
        props: {myimage:JSON.parse(JSON.stringify(myimage))}, // will be passed to the page component as props
      }
    }


export default Love