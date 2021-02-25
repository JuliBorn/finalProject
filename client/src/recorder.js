import MicRecorder from "mic-recorder-to-mp3";
import { Component } from "react";
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            isRecording: false,
            blobURL: "",
            isBlocked: false,
            chats: [],
        };
    }
    componentDidMount() {
        axios
            .get("/sounds")
            .then((response) => [
                console.log("Response from Server", response.data),
                this.setState({ chats: response.data }),
            ]);

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
                    console
                        .log("Response from Server after uploading", response)
                        .catch((err) => {
                            "Error uploading to server";
                        });
                    this.setState({ blobURL, isRecording: false });
                });
            })
            .catch((e) => console.log(e));
    }

    render() {
        return (
            <>
                <button
                    onClick={() => {
                        this.startRec();
                    }}
                    disabled={this.state.isRecording}
                >
                    Record
                </button>
                <button
                    onClick={() => {
                        this.stopRec();
                    }}
                    disabled={!this.state.isRecording}
                >
                    Stop
                </button>
                {this.state.chats.map((elem, index) => {
                    return (
                        <div className="chat_card" key={index}>
                            <audio
                                src={this.state.chats[index].sound_url}
                                controls="controls"
                                key={index}
                            ></audio>
                            {/* <p>{this.state.chats}</p> */}
                        </div>
                    );
                })}
            </>
        );
    }
}
