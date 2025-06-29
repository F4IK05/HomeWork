import React, { Component } from 'react';
import SignInForm from '../components/SignInForm'
import '../styles/SignPages.css'

class SignInPage extends Component {
    render() {
        return (
            <div className='container'>
                <SignInForm/>
            </div>
        );
    }
}

export default SignInPage;