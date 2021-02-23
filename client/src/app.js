import axios from "./axios";

import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import ProfilePic from "./profile_pic";
import Profile from "./profile";
import OtherProfile from "./other_profile";
import FindUsers from "./find_users";
import Friends from "./friends";
import Chat from "./chat";

import { reducer } from "./reducer";

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
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        //console.log("Mounted");

        axios.get("/profile").then((response) => {
            //console.log("Data from GET profile ", response.data);

            this.setState({
                id: response.data.id,
                first: response.data.first,
                last: response.data.last,
                email: response.data.email,
                profilePicUrl: response.data.profile_pic_url,
                bio: response.data.bio,
            });
        });
    }
    toggleUploader() {
        //console.log("Click!");
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }

    setProfilePicUrl(profilePicUrl) {
        //console.log("Setting state from uploader");
        this.setState({
            profilePicUrl: profilePicUrl,
            // uploaderVisible: false,
        });
    }

    setBio(bio) {
        this.setState({ bio: bio });
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
        if (!this.state.first) {
            return <div className="loader">Loading...</div>;
        }
        return (
            <>
                <BrowserRouter>
                    <Header />
                    <div className="body">
                        <div className="body_container">
                            <main className="body_content">
                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        return (
                                            <Profile
                                                first={this.state.first}
                                                last={this.state.last}
                                                profilePicUrl={
                                                    this.state.profilePicUrl
                                                }
                                                bio={this.state.bio}
                                                setBio={this.setBio}
                                            />
                                        );
                                    }}
                                />

                                <Route
                                    path="/user/:id"
                                    render={(props) => {
                                        return (
                                            <OtherProfile
                                                key={props.match.url}
                                                match={props.match}
                                                history={props.history}
                                                id={this.state.id}
                                            />
                                        );
                                    }}
                                />

                                <Route
                                    path="/users"
                                    render={(props) => {
                                        return (
                                            <>
                                                <FindUsers />
                                            </>
                                        );
                                    }}
                                />

                                <Route
                                    path="/friends"
                                    render={(props) => {
                                        return (
                                            <>
                                                <Friends
                                                    viewerId={this.state.id}
                                                />
                                            </>
                                        );
                                    }}
                                />

                                <Route
                                    path="/chat"
                                    render={(props) => {
                                        return (
                                            <>
                                                <Chat />
                                            </>
                                        );
                                    }}
                                />

                                {/* <Logo /> */}
                            </main>
                            <aside className="body_left">
                                <Link to="/users" className="side_bar_text">
                                    Find Users
                                </Link>
                                <br></br>
                                <Link to="/friends" className="side_bar_text">
                                    Friends
                                </Link>
                                <Link to="/chat" className="side_bar_text">
                                    Chat
                                </Link>
                            </aside>
                            <aside className="body_right">
                                <div className="profile_pic_container">
                                    <ProfilePic
                                        first={this.state.first}
                                        last={this.state.last}
                                        email={this.state.email}
                                        id={this.state.id}
                                        profilePicUrl={this.state.profilePicUrl}
                                        toggleUploader={this.toggleUploader}

                                        // onClick={() => this.toggleUploader()}
                                    />
                                    <p className="side_bar_text">
                                        ID: {this.state.id}
                                    </p>
                                    <p className="side_bar_text">
                                        {this.state.first}
                                    </p>
                                    <p className="side_bar_text">
                                        {this.state.last}
                                    </p>
                                    <p className="side_bar_text">
                                        {this.state.email}
                                    </p>
                                </div>
                                {this.state.uploaderVisible && (
                                    <Uploader
                                        setProfilePicUrl={this.setProfilePicUrl}
                                    />
                                )}
                            </aside>
                        </div>
                    </div>

                    <button onClick={() => this.logout()}>Logout</button>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }
}
