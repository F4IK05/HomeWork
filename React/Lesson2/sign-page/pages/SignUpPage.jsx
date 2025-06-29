import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import '../styles/SignPages.css'

class SignUpPage extends Component {
    render() {
        return (
            <div className='container'>
                <SignUpForm/>
            </div>
        );
    }
}

export default SignUpPage;