import axios from "axios";

import { Component } from "react";

import Header from "./header";
import Footer from "./footer";
import Recorder from "./recorder";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    logout() {
        //req.session = null;
        axios.get("/logout").then((response) => {
            //console.log("Logout Response: ", response);
            location.replace("/welcome");
        });
    }
    render() {
        //console.log("This App State: ", this.state);

        return (
            <>
                <Recorder />
                <Footer />
            </>
        );
    }
}
