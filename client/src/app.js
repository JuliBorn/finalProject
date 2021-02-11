import axios from "./axios";

import { Component } from "react";

import ProfilePic from "./profile_pic";
import Uploader from "./uploader";
import Logo from "./logo";

import Header from "./header";
import Footer from "./footer";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderVisible: false,
        };
    }
    componentDidMount() {
        console.log("Mounted");

        axios.get("/profile").then((response) => {
            console.log("Data from GET profile ", response.data);
        });

        ///GET DATA FROM SERVER WITH AXIOS
        this.setState({
            first: "Julius",
            last: "Born",
            email: "juliusbornmuc@gmail.com",
        });
    }
    toggleUploader() {
        console.log("Click!");
        //this.setState({ uploaderVisible: !this.uploaderVisible });
    }
    render() {
        console.log("This App State: ", this.state);
        // if (!this.state.id) {
        //     return null;
        //     //Adding spinner div?
        // }
        return (
            <>
                <Header />
                <ProfilePic
                    image={this.state.imgulr}
                    first={this.state.first}
                    last={this.state.last}
                    toggleUploader={this.toggleUploader}
                    onClick={() => this.toggleUploader()}
                />
                {/* <Profile /> */}
                <Logo />
                <Uploader />
                <Footer />
            </>
        );
    }
}
