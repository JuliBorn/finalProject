import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

// import { WaveformContianer, Wave, PlayButton } from "./Waveform.styled";

class Waveform extends Component {
    state = {
        playing: false,
    };

    componentDidMount() {
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: "#waveform",
            backend: "WebAudio",
            height: 80,
            progressColor: "#2D5BFF",
            responsive: true,
            waveColor: "#EFEFEF",
            cursorColor: "transparent",
            xhr: {
                cache: "default",
                mode: "cors",
                method: "GET",
                credentials: "same-origin",
                redirect: "follow",
                referrer: "client",
                headers: [{ key: "Authorization", value: "my-token" }],
            },
        });

        this.waveform.load(track);
    }

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        const url =
            "https://s3.amazonaws.com/spicedling/yR-SvX5iDv52YAeIlnzEZd_nV5FlszC2";

        return (
            <div>
                <button onClick={this.handlePlay}>
                    {!this.state.playing ? "Play" : "Pause"}
                </button>
                <div id="waveform" />
                <audio id="track" src={url} crossOrigin="anonymous" />
            </div>
        );
    }
}

export default Waveform;
