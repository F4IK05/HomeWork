import React, { Component } from 'react';

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username: ", this.state.username)
        console.log("Password: ", this.state.password)
    }


    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <h1>Sign in</h1>
                <label>Username</label>
                <input type="text" name='username' onChange={this.handleChange} value={this.state.username} />

                <label>Password</label>
                <input type="password" name='password' onChange={this.handleChange} value={this.state.password} />

                <button type='submit'>Submit</button>
            </form>
        );
    }
}

export default SignInPage;