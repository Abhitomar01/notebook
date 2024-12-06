import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-Type': "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })


        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Log in succesfully", "success")
            navigate("/");

        } else {
            props.showAlert("please enter valid credentials", "danger")
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className=' container mt-5 p-4 bg-light shadow rounded'>

            <h2 className='text-center text-primary mb-4'>Log in to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold text-secondary">Email address</label>
                    <input type="email" className="form-control border-primary shadow-sm" id="exampleInputEmail1" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold text-secondary">Password</label>
                    <input type="password" className="form-control border-primary shadow-sm" name="password" id="password" value={credentials.password} onChange={onchange} />
                </div>

                <button type="submit" className="btn btn-primary w-100 shadow-sm">Submit</button>
            </form>
        </div>
    )
}

export default Login