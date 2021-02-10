import axios from "./axios";
import React from "react";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderView: 1,
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
                    console.log("SUCCES");
                    this.setState({ renderView: 2 });
                }
            });
    }

    determineWhichViewToRender() {
        if (this.state.renderView === 1) {
            return (
                <div>
                    <input
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
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="password"
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="code"
                    />
                    <button onClick={() => this.postEmail()}></button>
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
