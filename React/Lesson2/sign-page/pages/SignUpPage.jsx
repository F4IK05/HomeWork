import React, { Component } from 'react';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log("Username: ", this.state.username)
        console.log("Email: ", this.state.email)
        console.log("Password: ", this.state.password)
    }


    render() {
        return (
            <div className="container">
                <form action="" onSubmit={this.handleSubmit}>
                    <h1>Sign up</h1>
                    <label>Username</label>
                    <input type="text" name='username' onChange={this.handleChange} value={this.state.username}/>

                    <label>Email</label>
                    <input type="email" name='email' onChange={this.handleChange} value={this.state.email}/>

                    <label>Password</label>
                    <input type="password" name='password' onChange={this.handleChange} value={this.state.password}/>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default SignUpPage;