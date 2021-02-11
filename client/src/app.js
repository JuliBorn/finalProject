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
        this.toggleUploader = this.toggleUploader.bind(this);
        this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
    }
    componentDidMount() {
        console.log("Mounted");

        axios.get("/profile").then((response) => {
            console.log("Data from GET profile ", response);

            this.setState({
                first: response.data.first,
                last: response.data.last,
                email: response.data.email,
                profilePicUrl: response.data.profile_pic_url,
            });
        });
    }
    toggleUploader() {
        console.log("Click!");
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }

    setProfilePicUrl(profilePicUrl) {
        console.log("Setting state from uploader");
        this.setState({
            profilePicUrl: profilePicUrl,
            // uploaderVisible: false,
        });
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
                    first={this.state.first}
                    last={this.state.last}
                    profilePicUrl={this.state.profilePicUrl}
                    toggleUploader={this.toggleUploader}
                    // onClick={() => this.toggleUploader()}
                />
                {/* <Profile /> */}
                <Logo />
                {this.state.uploaderVisible && (
                    <Uploader setProfilePicUrl={this.setProfilePicUrl} />
                )}
                <Footer />
            </>
        );
    }
}
