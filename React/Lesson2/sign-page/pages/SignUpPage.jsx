import React, { Component } from 'react';

class SignUpPage extends Component {
    render() {
        return (
            <div className="container">
                <form action="">
                    <h1>Sign up</h1>
                    <label>Username</label>
                    <input type="text" />

                    <label>Email</label>
                    <input type="email" />

                    <label>Password</label>
                    <input type="password" />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default SignUpPage;