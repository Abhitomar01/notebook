import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: 'POST',
      headers: {
        'content-Type': "application/json",
      },
      body: JSON.stringify({ name, email, password })


    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken)
      navigate("/");
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Invalid credentials", "danger")
    }
  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className=' conatiner mt-5 p-4 bg-light shadow rounded'>
      <h2 className='text-center text-primary mb-4'>sign up to get start with notebook</h2>
      <form onSubmit={handleSubmit}>


        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold text-secondary">Name</label>
          <input type="text" className="form-control border-primary shadow-sm" id="name" onChange={onchange} name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold text-secondary">Email address</label>
          <input type="email" className="form-control border-primary shadow-sm " id="exampleInputEmail1" onChange={onchange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold text-secondary">Password</label>
          <input type="password" className="form-control border-primary shadow-sm" onChange={onchange} name="password" id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label fw-bold text-secondary"> confermPassword</label>
          <input type="cpassword" className="form-control border-primary shadow-sm" onChange={onchange} name="cpassword" id="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup