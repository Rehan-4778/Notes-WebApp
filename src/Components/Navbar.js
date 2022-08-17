import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom";
import AlertContext from '../Context/Alert/AlertContext';


function Navbar(props) {
    const context = useContext(AlertContext);
    const navigate = useNavigate();

    const handleLogout = () =>{
        context.ShowAlert("success","Loggedout successfully")

        localStorage.removeItem('token');
        // Redirect to Login page
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>

                        {/* If user is logged in then only show logout button */}
                    {!localStorage.getItem('token')? <form className='d-flex'>
                        <Link type="button" className="mx-1 btn btn-outline-warning" to="/login" >Login</Link>
                        <Link type="button" className="mx-1 btn btn-warning" to="/signup" >Signup</Link>
                    </form> : <button type="button" className="btn btn-warning" onClick={handleLogout} >Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
