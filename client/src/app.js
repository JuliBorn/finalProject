import { Component } from "react";

import Footer from "./footer";
import Recorder from "./recorder";

import RecButton from "./shader";
import { Surface } from "gl-react-dom"; // for React DOM
import Waveform from "./player";

import Chat from "./chat";
//import TonePlayer from "./tone";

export default class App extends Component {
    constructor() {
        super();
        this.state = { fader: 0.2, frameCounter: 0 };
    }

    render() {
        //console.log("This App State: ", this.state);

        return (
            <>
                <div className="body">
                    <Chat />

                    <Recorder />
                    {/* <Waveform url={"./sounds/kick.wav"} /> */}
                    <Surface
                        width={400}
                        height={400}
                        className="shader_background"
                    >
                        <RecButton fader={this.state.fader} />
                    </Surface>
                </div>
                <Footer />
            </>
        );
    }
}
