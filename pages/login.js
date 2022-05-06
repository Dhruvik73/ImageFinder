import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [val, setval] = useState({email:'',password:''})
  const onchange=(e)=>{
  setval({...val,[e.target.name]:e.target.value})
  }
  const verify=async ()=>{
    const result=await fetch('http://localhost:3000/api/fetchuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:val.email,password:val.password})
    });
    const mypass=await result.json()
    if(mypass.pass){
      setTimeout(()=>{
        window.location=`/home/${val.email}`
      },3000)
      toast.success('Login SuccessFully 👍', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        localStorage.setItem('user',mypass.token)
    }
    else if(mypass.error){
      toast.error('Enter correct email', {
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
      toast.error('Enter correct password', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  return (
    <div className='container'>
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
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form1Example13">Email address</label>
            <input onChange={onchange} type="email" name='email' id="form1Example13" className="form-control form-control-lg" />
          </div>

          
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form1Example23">Password</label>
            <input onChange={onchange} type="password" name='password' id="form1Example23" className="form-control form-control-lg" />
          </div>

          <div className=" align-items-center mb-4">
            <Link href={'/forgot'}><a>Forgot password?</a></Link>
          </div><button type="submit" onClick={verify} className="btn btn-primary btn-block">Sign in</button>
      </div>
    </div></div></section>
</div>
  )
}
export default Login