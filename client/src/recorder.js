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
            recModal: false,
            frameCounter: 0,
            recName: "",
            category: "Voice",
            blob: null,
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

                that.setState({ recModal: true });
                that.setState({ blob: blob });
            })
            .catch((e) => console.log(e));
    }

    sendRec() {
        console.log("Sending File");
        const fd = new FormData();
        const blob = this.state.blob;

        fd.append("audio/mp3", blob);
        fd.append("recName", this.state.recName);
        fd.append("category", this.state.category);
        console.log("rec name", this.state.recName);

        console.log("rec name", this.state.category);
        const that = this;
        console.log("sending file", fd);
        axios.post("/sound", fd).then((response) => {
            console.log("Response from Server after uploading", response);
            that.props.updateChat(response.data.id);
            that.setState({ blobURL: false });
            that.setState({ recModal: false });
        });
    }
    handleChange(e) {
        console.log(e.target.value, "changed");
        this.setState({ [e.target.name]: e.target.value });
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
                    <div className="recModal">
                        <div className="recModalInput">
                            <input
                                placeholder="Enter Name here"
                                name="recName"
                                type="text"
                                onChange={(e) => this.handleChange(e)}
                                autoComplete="off"
                            ></input>
                            <select
                                name="category"
                                onChange={(e) => this.handleChange(e)}
                            >
                                <option>Voice</option>
                                <option>Music</option>
                                <option>Field</option>
                            </select>
                            <button
                                onClick={() => {
                                    this.sendRec();
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
