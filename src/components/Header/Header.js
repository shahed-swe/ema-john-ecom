import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useAuth } from '../Login/useAuth';
import './Header.css';

const Header = () => {

    const auth = useAuth();
    // console.log(auth.user)

    return (
        <div className="header">
            <img src={logo} alt="logo" />
            <nav>
                <Link to="/">Shop</Link>
                <Link to="/review">Order Review</Link>
                {/* <a href="/inventory">Manage Inventory</a> */}
                {
                    auth.user && <span style={{ color: 'yellow' }}>Welcome {auth.user.name}</span>
                }
                {
                    auth.user ? <Link to="/login"> Sign out</Link>
                        : <Link to="/login"> Sign in</Link>
                }
            </nav>
        </div>
    );
};

export default Header;