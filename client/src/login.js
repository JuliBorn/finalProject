import axios from "./axios";

import { Component } from "react";

import { Link } from "react-router-dom";
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            userError: false,
            dbError: false,
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick() {
        console.log("click");
        let userData = {
            email: this.state.email,
            password: this.state.password,
        };

        if (userData.email && userData.password) {
            axios
                .post("/login", userData)
                .then((response) => {
                    console.log("Res from Server: ", response.data.error);
                    if (response.data.error) {
                        this.state = {
                            dbError: true,
                        };
                    } else {
                        this.state = {
                            dbError: false,
                        };
                        location.replace("/");
                    }
                })
                .catch((err) => {
                    console.log("Error in Server response", err);
                });
        } else {
            this.setState({
                userError: true,
            });
        }
    }

    render() {
        return (
            <>
                <div className="auth_form">
                    <h1>Login</h1>
                    <div className="register_form">
                        <div className="input_field">
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="email"
                                placeholder="eMail"
                                className="text"
                                name="email"
                            />
                        </div>
                        <div className="input_field">
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="password"
                                placeholder="Password"
                                className="text"
                                name="password"
                            />
                        </div>
                        {this.state.userError && <p>All field required</p>}
                        {this.state.dbError && <p>Wrong Input</p>}
                        <button
                            onClick={() => this.handleClick()}
                            id="login-button"
                            className="text"
                        >
                            Login
                        </button>
                        <Link to="/">Register</Link>
                        <Link to="/password-reset">Forget Password?</Link>
                    </div>
                </div>
            </>
        );
    }
}
