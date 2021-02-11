import axios from "./axios";
import React from "react";

import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderView: 1,
            userError: false,
            email: "",
            password: "",
            code: "",
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    postEmail() {
        console.log("Email clicked");
        if (this.state.email) {
            axios
                .post("/password/reset/start", {
                    email: this.state.email,
                })
                .then((response) => {
                    console.log("Response from Server", response);
                    if (response.data.success) {
                        console.log("SUCCESS");
                        this.setState({ renderView: 2 });
                    } else {
                        console.log("Error from Server");
                        this.setState({ userError: true });
                    }
                })
                .catch((err) => {
                    console.log("Error from Server", err);
                });
        } else {
            this.setState({ userError: true });
        }
    }

    postCode() {
        console.log("Post Code clicked");

        axios
            .post("/password/reset/verify", {
                password: this.state.password,
                code: this.state.code,
            })
            .then((response) => {
                console.log("Response from Server", response);
                if (response.data.success) {
                    console.log("SUCCESS");
                    this.setState({ renderView: 3 });
                }
            });
    }
    determineWhichViewToRender() {
        if (this.state.renderView === 1) {
            return (
                <div>
                    <input
                        type="email"
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="eMail"
                    />
                    {this.state.userError && <p>Wrong Input</p>}
                    <button onClick={() => this.postEmail()}>Submit</button>
                </div>
            );
        } else if (this.state.renderView === 2) {
            console.log("State in Render View 2", this.state);
            return (
                <div>
                    <input
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="New Password"
                        key={1}
                    />
                    <input
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="Code"
                    />
                    {this.state.userError && <p>All field required</p>}
                    <button onClick={() => this.postCode()}>
                        Change Password
                    </button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div>
                    <h1>success</h1>
                    <Link to="/login">Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="auth_form">
                <div className="register_form">
                    <h1>reset password</h1>
                    {this.state.error && <p>error</p>}
                    {this.determineWhichViewToRender()}
                </div>
            </div>
        );
    }
}
