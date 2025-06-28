import React, { Component } from 'react';

class SignInPage extends Component {
    render() {
        return (
            <div className="container">
                <form action="">
                    <h1>Sign in</h1>
                    <label>Username</label>
                    <input type="text" />

                    <label>Password</label>
                    <input type="password" />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default SignInPage;