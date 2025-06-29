import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
                <ul>
                    <li><Link to="/">Sign in</Link></li>
                    <li><Link to="/sign-up">Sign up</Link></li>
                </ul>
            </div>
        );


    }
}

export default Navbar;