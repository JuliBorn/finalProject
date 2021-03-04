import { Component } from "react";
import ReactAudioPlayer from "react-audio-player";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export default class Bubble extends Component {
    constructor(props) {
        super(props);
        this.state = { isPlaying: false };
    }

    play() {
        console.log("PlAY");
        this.setState({ isPlaying: true });
        console.log(this.rap.audioEl);
        this.rap.audioEl.current.play();
    }
    render() {
        return (
            <div
                className={`bubble floating ${this.props.category}`}
                onClick={() => {
                    this.play();
                }}
            >
                <ReactAudioPlayer
                    src={this.props.url}
                    preload="auto"
                    ref={(element) => {
                        this.rap = element;
                    }}
                    crossorigin="use-credentials"
                />

                <p className="text_date text_name">{this.props.recName}</p>

                <p className="text_date">{this.props.date}</p>
                <p className="text_date">{this.props.time}</p>
            </div>
        );
    }
}
