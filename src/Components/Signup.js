import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/AlertContext';

function Signup() {

    const context = useContext(AlertContext);
    const { ShowAlert } = context;

    let navigate = useNavigate();
    const [signupCreds, setSignupCreds] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleChange = (e) => {
        setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupCreds.password !== signupCreds.cpassword) {
            // Show Alert
            ShowAlert("danger", "Confirm Password does'nt matches with Password");
        }
        else {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: signupCreds.name, email: signupCreds.email, password: signupCreds.password })
            });

            const json = await response.json();
            if (json.success) {

                // Show Alert
                ShowAlert("success", "Account created successfully");

                // Save token in local storage
                localStorage.setItem('token', json.authToken);
                // redirect to home
                setTimeout(() => {
                    navigate('/home');
                }, 300);
            }
            else {
               // Show Alert
               ShowAlert("danger", "Please enter valid credentials");
            }

        }
    }


    return (
        <div className='container my-5'>
            <div className='mb-3'>
                <h3>Signup to iNotebook</h3>
            </div>
            <form onSubmit={handleSignup}>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter your name" name='name' minLength={5} required onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' minLength={5} required onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" name='cpassword' minLength={5} required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
