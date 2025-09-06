import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Register extends Component {

    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    };

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post('register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm
        });

        this.setState({
            redirect: true
        });

        console.log(response);
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to="/login" />
        }

        return (
            <div className="container mt-5">
                <h2>Register</h2>
                <form onSubmit={this.submit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName"
                            onChange={(e) => this.first_name = e.target.value} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName"
                            onChange={(e) => this.last_name = e.target.value} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email"
                            onChange={(e) => this.email = e.target.value} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control" id="password"
                            onChange={(e) => this.password = e.target.value} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="passwordConfirm" className="form-label">Password Confirm</label>
                        <input type="text" className="form-control" id="passwordConfirm"
                            onChange={(e) => this.password_confirm = e.target.value} />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>

                    <div className="mt-3">
                        <span>Back to </span>
                        <Link to="/login">Login</Link>
                    </div>

                </form>
            </div>

        );
    }
}

export default Register;