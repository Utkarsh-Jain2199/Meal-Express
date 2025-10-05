import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Badge } from '@mui/material';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import './styles/Navbar.css';

export default function Navbar(props) {
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const storedName = localStorage.getItem('userName');
            if (storedName) {
                const firstName = storedName.split(' ')[0];
                setUserName(firstName);
            }
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            setLoading(true);
            const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/getuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });

            const user = await response.json();
            if (user && user.name) {
                const firstName = user.name.split(' ')[0];
                setUserName(firstName);
                localStorage.setItem('userName', user.name);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }


    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fw-bold" to="/">Meal Express</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-4 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("token")) ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link fs-4 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fs-4 mx-3 active" aria-current="page" to="/profile" >Profile</Link>
                                    </li>
                                </> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form>
                            :
                            <>
                                <span className="user-greeting">Hi, {userName || 'User'}!</span>

                                <Link to="/cart" className="btn bg-white text-success mx-2">
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
