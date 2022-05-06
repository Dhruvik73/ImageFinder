import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
function Forgot() {
    const router=useRouter()
    const [val, setval] = useState({ email: "", password: null });
    const [v, setverify] = useState(false);
    const onchange = (e) => {
        setval({ ...val, [e.target.name]: e.target.value });
    };
    const verify = async () => {
        const result = await fetch("http://localhost:3000/api/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: val.email }),
        });
        const myuser = await result.json();
        if (myuser.email) {
            toast.success("Your Email is Verified  👍", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setverify(true)
        }
        else{
            toast.warning("Enter Correct Email..", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setverify(false)
        }
    };
    const changepass=async ()=>{
        if(val.password==null){
            toast.warning("Enter some value...", {
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
        const pass = await fetch("http://localhost:3000/api/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:val.email,password:val.password}),
        });
        const r=await pass.json()
        if(r.success){
            toast.success("Your Password was changed 👍", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(()=>{
                router.push('/')
            },2000)
        }
        else{
            toast.warning("Try Again...", {
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
    }
    return (
        <>
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
            <div
                className="d-flex container flex-row border border-gray"
                style={{
                    backgroundColor: "#f7ecd8",
                    height: 40 + "vh",
                    width: 50 + "vw",
                    marginTop: 100 + "px",
                    borderRadius: 50 + "px",
                }}
            >
                {!v&&<div
                    className="form-outline flex-fill mb-0"
                    style={{ marginTop: 100 + "px" }}
                >
                    <label className="form-label" htmlFor="form3Example1c">
                        <h5>Email</h5>
                    </label>
                    <input
                        onChange={onchange}
                        type="email"
                        name="email"
                        id="form3Example1c"
                        className="form-control"
                    />
                    <div className="d-flex" style={{ marginTop: 30 + "px" }}>
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            onClick={verify}
                        >
                            Verify
                        </button>
                    </div>
                </div>}
                {v&&<div
                    className="form-outline flex-fill mb-0"
                    style={{ marginTop: 100 + "px" }}
                >
                    <label className="form-label" htmlFor="form3Example1c">
                        <h5>NewPassword</h5>
                    </label>
                    <input
                        onChange={onchange}
                        type="text"
                        name="password"
                        id="form3Example1c"
                        className="form-control"
                    />
                    <div className="d-flex" style={{ marginTop: 30 + "px" }}>
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            onClick={changepass}
                        >
                            Change
                        </button>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default Forgot;
