import MicRecorder from "mic-recorder-to-mp3";
import { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faMicrophone,
    faMicrophoneAlt,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const Mp3Recorder = new MicRecorder({ bitRate: 256 });

export default class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: "",
            isBlocked: false,

            frameCounter: 0,
        };
    }
    componentDidMount() {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log("Permission Granted");
                this.setState({ isBlocked: false });
            },
            () => {
                console.log("Permission Denied");
                this.setState({ isBlocked: true });
            }
        );
    }

    startRec() {
        if (this.state.isBlocked) {
            console.log("Permission Denied");
        } else {
            console.log("Start Recording");
            Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true });
                })
                .catch((e) => console.error("Error Recording mp3", e));
        }
    }

    stopRec() {
        console.log("Stop Recording");
        this.setState({ isRecording: false });
        const that = this;
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                console.log("Bloburl", blobURL);
                console.log("Blob", blob);

                const fd = new FormData();

                fd.append("audio/mp3", blob);

                console.log("sending file", fd);

                axios.post("/sound", fd).then((response) => {
                    console.log(
                        "Response from Server after uploading",
                        response
                    );

                    that.props.updateChat(response.data.id);

                    that.setState({ blobURL: false });
                });
            })
            .catch((e) => console.log(e));
    }

    render() {
        return (
            <>
                {!this.state.isRecording && (
                    <>
                        <button
                            onClick={() => {
                                this.startRec();
                            }}
                            // disabled={this.state.isRecording}
                            className="record_button"
                        >
                            <FontAwesomeIcon
                                icon={faMicrophoneAlt}
                                className="icon"
                            />
                        </button>
                        <p className="recorderText"></p>
                    </>
                )}
                {this.state.isRecording && (
                    <button
                        onClick={() => {
                            this.stopRec();
                        }}
                        className="record_button"
                    >
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    </button>
                )}
                {this.state.recModal && (
                    <div className="recModal">Enter Name</div>
                )}
            </>
        );
    }
}
