import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

class Navbar extends Component {
    render() {
        return (
            <Router>
                <div className='navbar'>
                    <ul>
                        <li><Link to="/">Sign in</Link></li>
                        <li><Link to="/sign-up">Sign up</Link></li>
                    </ul>
                </div>

                <Routes>
                    <Route path='/' exact element={<SignInPage/>}/>
                    <Route path='/sign-up' element={<SignUpPage/>}/>
                </Routes>
            </Router>
        );


    }
}

export default Navbar;