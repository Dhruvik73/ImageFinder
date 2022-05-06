import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const a='beautyofyoungsociety'
  const router=useRouter()
  useEffect(() => {
    if(localStorage.getItem('user')){
      try {
        const verify=jwt.verify((localStorage.getItem('user')),a)
        if(verify){
          router.push(`/home/${verify}`)
        }
        else{
          router.push('/signup')
        }
      } catch (error) {
        router.push('/signup')
      }
  
  }else{
    toast.warning('You need to login or signup!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      router.push('/signup')
  }}, [])
  return (<>
    <div className={styles.container}>
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
      <Head>
        <title>Imagefinder</title>
        <meta name="description" content="find your favorite image here" />
      </Head>
      </div>
    </>
  )
}

