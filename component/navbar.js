import React from 'react'
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RiCreativeCommonsByFill} from 'react-icons/ri';
import {FaBlog} from 'react-icons/fa';
function Navbar({con}) {
  const router=useRouter()
  const [search, setsearch] = useState('')
  const logout=()=>{
    localStorage.removeItem('user')
    window.location='/login'
  }
  const searchfunc=(e)=>{
  setsearch(e.target.value)
  }
  const submit=async()=>{
    if(search.length==0){
      toast.warning('No images of your prefference...🤷‍♂️', {
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
      router.push(`/search/${search}`)
    }
  }
  const profile=async ()=>{
   const email=jwt.verify(localStorage.getItem('user'),'beautyofyoungsociety')
   router.push(`/profile/${email}`)
  }
  
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
    <div className="container-fluid">
        <div className=" me-auto mb-2 d-flex" style={{marginLeft:-10+'px'}}>
          <span className=" navbar-nav nav-item" style={{marginRight:10+'px'}} >
            <Link href={'/'}><a className="nav-link active" >Home</a></Link>
          </span>
          <span className="navbar-nav nav-item" style={{marginRight:10+'px'}} >
          <Link href={'/Nature'}><a className="nav-link active" >Nature</a></Link>
          </span>
          <span className="navbar-nav nav-item" style={{marginRight:10+'px'}}>
          <Link href={'/sport'}><a className="nav-link active" >Sports</a></Link>
          </span>
          <span className="navbar-nav nav-item" style={{marginRight:10+'px'}}>
          <Link href={'/animal'}><a className="nav-link active">Animals</a></Link>
          </span>
          <span className="navbar-nav nav-item" style={{marginRight:10+'px'}}>
          <Link href={'/love'}><a className="nav-link active">Love</a></Link>
          </span>
        </div>
        </div>
        <div className='d-flex'>
          <input className="form-control me-2" onChange={searchfunc} type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit" onClick={submit}>Search</button>
          </div>
          {con&&<div><h3 onClick={profile} style={{color:'white',marginLeft:10+'px',cursor:'pointer'}}><RiCreativeCommonsByFill/></h3></div>}
          {con&&<Link href={'/blog'}><h4 style={{color:'white',marginLeft:10+'px',cursor:'pointer'}}><FaBlog/></h4></Link>}
          <div className='d-flex' style={{marginTop:2+'px'}}>
          {!con&&<div>
        <Link href={'/signup'}><a className="btn btn-outline-success" style={{marginLeft:10+'px'}} type="submit">Signup</a></Link>
        </div>}
        {!con&&<div>
          <Link href={'/login'}><a className="btn btn-outline-success" style={{marginLeft:10+'px'}} type="submit">Login</a></Link>
        </div>}
        
        {con&&<div>
          <button onClick={logout} className="btn btn-outline-success" style={{marginLeft:10+'px'}}  type="submit">Logout</button>
          </div>}
          </div>
  </nav></div>
  )
}

export default Navbar