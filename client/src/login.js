import axios from "./axios";

import { Component } from "react";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick() {}

    render() {
        return (
            <>
                <h1>Login</h1>
            </>
        );
    }
}
