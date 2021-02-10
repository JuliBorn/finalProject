import axios from "./axios";

import { Component } from "react";

import ProfilePic from "./profile_pic";
import Uploader from "./uploader";
import Logo from "./logo";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("Mounted");

        axios.get("/profile/profile_pic").then((response) => {
            console.log(response);
        });

        ///GET DATA FROM SERVER WITH AXIOS
        this.setState({
            first: "Julius",
            last: "Born",
            email: "juliusbornmuc@gmail.com",
        });
    }

    render() {
        return (
            <>
                <ProfilePic />
                <Logo />
                <Uploader />
            </>
        );
    }
}
