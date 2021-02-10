import axios from "./axios";
import React from "react";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderView: 1,
            email: "",
            password: "",
            code: "",
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    postEmail() {
        console.log("Email clicked");

        axios
            .post("/password/reset/start", {
                email: this.state.email,
            })
            .then((response) => {
                console.log("Response from Server", response);
                if (response.data.success) {
                    console.log("SUCCESS");
                    this.setState({ renderView: 2 });
                }
            });
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
                    <button onClick={() => this.postEmail()}>Submit</button>
                </div>
            );
        } else if (this.state.renderView === 2) {
            return (
                <div>
                    <input
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="New Password"
                    />
                    <input
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="Code"
                    />
                    <button onClick={() => this.postCode()}>
                        Change Password
                    </button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div>
                    <h1>success</h1>
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
