import MicRecorder from "mic-recorder-to-mp3";
import { Component } from "react";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            isRecording: false,
            blobURL: "",
            isBlocked: false,
        };
    }
    componentDidMount() {
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
            Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true });
                })
                .catch((e) => console.error("Error Recording mp3", e));
        }
    }

    stopRec() {
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                const file = new File(buffer, "me-at-thevoice.mp3", {
                    type: blob.type,
                    lastModified: Date.now(),
                });
                this.setState({ blobURL, isRecording: false });
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
                <audio src={this.state.blobURL} controls="controls" />
            </>
        );
    }
}
