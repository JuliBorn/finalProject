import axios from "./axios";

import { Component } from "react";

export default class Registration extends Component {
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
        console.log("Clicked");

        let userData = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };

        if (
            userData.first &&
            userData.last &&
            userData.email &&
            userData.password
        ) {
            axios
                .post("/registration", userData)
                .then((response) => {
                    console.log("Response", response.data.error);
                    if (response.data.error) {
                        console.log("ERROR");
                        this.setState({
                            dbError: true,
                            userError: false,
                        });
                    } else {
                        location.replace("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                userError: true,
            });
        }
    }

    render() {
        return (
            <div className="body">
                <div className="body_container">
                    <div className="auth_form">
                        <h1>Register</h1>
                        {this.state.userError && <p>All field required</p>}
                        {this.state.dbError && <p>eMail already used</p>}
                        <div className="register_form">
                            <div className="input_field">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    type="text"
                                    placeholder="First Name"
                                    className="text"
                                    name="first"
                                />
                            </div>
                            <div className="input_field">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    type="text"
                                    placeholder="Last Name"
                                    className="text"
                                    name="last"
                                />
                            </div>
                            <div className="input_field">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    type="text"
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

                            <button
                                onClick={() => this.handleClick()}
                                id="login-button"
                                className="text"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
