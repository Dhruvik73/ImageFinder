import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '/styles/Home.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Search({images,myimage}) {
    if(myimage==null){
        toast.warning('No images To Show 🤷‍♂️', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    else{
        toast.success('All Images are On Your Display 👍', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  return (
     <div className={styles.container}><main>
            <ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
     <div className="album py-5 bg-light">
       <div className="container">
       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
         {images.map((k)=>{return <div key={k._id} className="col">
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
export async function getServerSideProps(context){
 const slug=await context.query.slug
 const data=await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({search:slug})
    });
    let images=[]
    let myimage=await data.json()
    if(myimage.data.length==0 && myimage.data1.length==0){
        myimage=null
    }
    else{
        if(myimage.data.length>0){
        for(var i=0;i<myimage.data.length;i++){
            images.push(myimage.data[i])
        }
    }
    if(myimage.data1.length>0){
        for(var i=0;i<myimage.data1.length;i++){
            images.push(myimage.data1[i])
        }
    }
    }
 return{
     props:{images:JSON.parse(JSON.stringify(images)),myimage:myimage}
 }
}
export default Search