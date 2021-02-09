import axios from "./axios";

import { Component } from "react";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {};
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick() {}

    render() {
        return (
            <div className="body">
                <div className="body_container">
                    <h1>Reset Password</h1>
                    <div className="reset_form">
                        <div className="input_field">
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                placeholder="eMail"
                                className="text"
                                name="email"
                            />
                        </div>

                        <button
                            onClick={() => this.handleClick()}
                            id="login-button"
                            className="text"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
