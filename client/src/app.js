import { Component } from "react";
import axios from "axios";

import Recorder from "./recorder";

import RecButton from "./shader";
import { Surface } from "gl-react-dom"; // for React DOM

import Chat from "./chat";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { fader: 0.2, frameCounter: 0, chats: [] };
        this.updateChat = this.updateChat.bind(this);
    }

    updateChat(state) {
        console.log("updating", state);
        axios.get("/sounds").then((response) => {
            console.log("Response from Server Bubble", response.data);
            this.setState({ chats: response.data });
            console.log(response.data.length, " sounds found");
            console.log(this.state.chats, "state chats");
        });
       
    }

    componentDidMount() {
        axios.get("/sounds").then((response) => {
            console.log("Response from Server Bubble", response.data);
            this.setState({ chats: response.data });
            console.log(response.data.length, " sounds found");
            console.log(this.state.chats, "state chats");
        });
    }
    render() {
        //console.log("This App State: ", this.state);

        return (
            <>
                <div className="body">
                    <Chat chats={this.state.chats} />

                    <Recorder updateChat={this.updateChat} />

                    <Surface
                        width={400}
                        height={400}
                        className="shader_background"
                    >
                        <RecButton fader={this.state.fader} />
                    </Surface>
                </div>
            </>
        );
    }
}
