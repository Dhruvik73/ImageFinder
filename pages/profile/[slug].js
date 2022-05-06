import React from 'react'
import user from '../../models/user'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile({myuser}) {
  const [a, seta] = useState(false)
  const [choice, setchoice] = useState([])
  const [val, setval] = useState({name:null})
  const set=(e)=>{
    choice.push(e.target.name)
    for(var i=0;i<choice.length;i++){
      for(var j=i+1;j<choice.length;j++){
        if(choice[i]==choice[j]){
          choice.splice(j,j)
        }
      }
    }
    console.log(choice)
 }
  const onchange=(e)=>{
    setval({...val,[e.target.name]:e.target.value})
   }
  const edit=async ()=>{
    if(val.name==null || choice.length==0){
      alert('enter some value or select at least one choice!')
    }
    else{
    const res=await fetch('http://localhost:3000/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:myuser.email,name:val.name,choices:choice})
    });
    const newres=await res.json()
    if(newres.success){
      toast.success('Your data edited successfully 👍', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setTimeout(()=>{
          window.location=`/profile/${myuser.email}`
        },2000)
        
    }
  }
  }
  return (
    <div>
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
      {!a&&<div className="container" style={{marginTop:30+"vh"}}>
    <div className="main-body">
    <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{myuser.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {myuser.name}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {myuser.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Your Image Choices</h6>
                    </div>
                    <div className="col-sm-2 text-secondary border border-dark">
                      {myuser.choices.map((k)=>{ return <h6 key={k}>{k}</h6>})}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <button onClick={()=>{seta(true)}} className="btn btn-outline-success">Edit</button>
                    </div>
                  </div>
                </div>
              </div>

              </div>
          </div>
        </div>
    </div>}
    {a&&<div><section   style={{backgroundColor:'white',marginTop:15+'vh'}}>
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black  border border-dark" style={{borderRadius:25+'px'}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
  
                  <form className="mx-1 mx-md-4 ">
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <p style={{color:'red'}}>Note:- Select your choices carefully.. once you check in the checkbox it will be added.....</p>
                      <p>if you need to edit your name enter your new name here else enter your old name</p>
                      <label className="form-label" htmlFor="form3Example1c"><h5>Your Name</h5></label>
                        <input onChange={onchange} type="text" name='name' id="form3Example1c" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-check">
                        <h3>Select your Choices</h3>
  <input className="form-check-input" onClick={set} name='nature' type="checkbox"  id="flexCheckDefault" />
  <label className="form-check-label" htmlFor="flexCheckDefault">Nature</label>
</div>
<div className="form-check">
  <input className="form-check-input" onClick={set} name='sport' type="checkbox" id="flexCheckChecked"/>
  <label className="form-check-label" htmlFor="flexCheckChecked">Sports</label>
</div>
<div className="form-check">
  <input className="form-check-input" onClick={set} name='animal' type="checkbox"  id="flexCheckChecke"/>
  <label className="form-check-label" htmlFor="flexCheckChecke">Animals</label>
</div>
<div className="form-check">
  <input className="form-check-input" onClick={set} name='love' type="checkbox"  id="flexCheckCheckd"/>
  <label className="form-check-label" htmlFor="flexCheckCheckd">Love</label>
</div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" onClick={edit} className="btn btn-outline-success">Edit</button>
                    </div>
  
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>}
    </div>
  )
}
export async function getServerSideProps(context){
  const email=await context.query.slug
  const myuser=await user.findOne({email:email})
  return{
    props:{myuser:JSON.parse(JSON.stringify(myuser))}
  }

}
export default Profile