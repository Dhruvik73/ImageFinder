import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../component/navbar'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'
function MyApp({ Component, pageProps }) {
  const router=useRouter()
  const sec='beautyofyoungsociety'
  const [con, setcon] = useState()
  useEffect(() => {
    if(localStorage.getItem('user')){
      try{
      const verify=jwt.verify(localStorage.getItem('user'),sec)
      if(verify){
      setcon(true)
      }
      else{
        router.push('/')
        setcon(false)
      }

    }  catch(error){
      router.push('/')
      setcon(false)
    }}
  }, [])
  
  return <>
  <Navbar con={con}/>
  <Component {...pageProps} />
  </>
}

export default MyApp
