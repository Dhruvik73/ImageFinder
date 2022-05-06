import React,{useState} from 'react'
function Signup() {
 const [val, setval] = useState({name:'',email:'',password:'',cpassword:''})
 const [choice, setchoice] = useState([])
 const onchange=(e)=>{
  setval({...val,[e.target.name]:e.target.value})
 }
const set=(e)=>{
   choice.push(e.target.name)
   for(var i=0;i<choice.length;i++){
    for(var j=i+1;j<choice.length;j++){
      if(choice[i]==choice[j]){
        choice.splice(j,j)
      }
    }
  }
}
const register=async ()=>
{
  if(val.password==val.cpassword){
    const json=await fetch('http://localhost:3000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:val.name,email:val.email,password:val.password,choices:choice})
      });
      const myjson=await json.json()
      if(myjson.token){
      localStorage.setItem('user',myjson.token)
      window.location=`/home/${myjson.email}`
}
     else{

     }
  }
  else{
    alert('your re-entered password is incorrect!')
  }
    }
  return (
    <div><section className="vh-100" style={{backgroundColor:'white'}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{borderRadius:25+'px'}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
  
                  <form className="mx-1 mx-md-4">
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        <input onChange={onchange} type="text" name='name' id="form3Example1c" className="form-control" />
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        <input onChange={onchange} type="email" name='email' id="form3Example3c" className="form-control" />  
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                        <input onChange={onchange} type="password" name='password' id="form3Example4c" className="form-control" />
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        <input type="password" id="form3Example4cd" onChange={onchange} name='cpassword' className="form-control" />
                      </div>
                    </div>
                    <div className="form-check">
                        <h3>Select your Choices</h3>
  <input className="form-check-input" name='nature' type="checkbox" onClick={set} id="flexCheckDefault" />
  <label className="form-check-label" htmlFor="flexCheckDefault">Nature</label>
</div>
<div className="form-check">
  <input className="form-check-input" name='sport' type="checkbox" onClick={set} id="flexCheckChecked"/>
  <label className="form-check-label" htmlFor="flexCheckChecked">Sports</label>
</div>
<div className="form-check">
  <input className="form-check-input" name='animal' type="checkbox" onClick={set}  id="flexCheckChecke"/>
  <label className="form-check-label" htmlFor="flexCheckChecke">Animals</label>
</div>
<div className="form-check">
  <input className="form-check-input" name='love' type="checkbox" onClick={set}  id="flexCheckCheckd"/>
  <label className="form-check-label" htmlFor="flexCheckCheckd">Love</label>
</div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3c"
                      />
                      <label className="form-check-label" htmlFor="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>
  
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" onClick={register} className="btn btn-primary btn-lg">Register</button>
                    </div>
  
                  </form>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default Signup