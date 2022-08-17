import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../Context/Alert/AlertContext';

function Login() {

    const context = useContext(AlertContext);
    const {ShowAlert} = context;

    let navigate = useNavigate();
    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginCreds.email, password: loginCreds.password })
        });

        const json = await response.json();
        if(json.success){
            // Show Alert
            ShowAlert("success","LoggedIn successfully");

            // Save token in local storage
            localStorage.setItem('token',json.authToken);

            // redirect to home
            setTimeout(() => {
                navigate('/home');
            }, 300);
        }
        else{
            // Show Alert
            ShowAlert("danger","Enter valid login credentials");
        }

    }

    return (
        <div className='container my-5'>
            <div className='mb-3'>
                <h3>Login</h3>
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
