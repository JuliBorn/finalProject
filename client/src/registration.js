import axios from "axios";
import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first: "",
            last: "",
            email: "",
            password: "",
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

        axios
            .post("/registration", userData)
            .then((response) => {
                console.log("Response", response.data.error);
                if (response.data.error) {
                    console.log("ERROR");
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="body">
                <div className="body_container">
                    <div className="auth_form">
                        <h1>Register</h1>
                        {this.state.error && <p>Something broke</p>}
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
