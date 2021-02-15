import axios from "./axios";
import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
        this.submitBio = this.submitBio.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log("Actual Bio: ", this.state.bio);
    }
    changeMode() {
        this.setState({ editMode: true });
    }

    submitBio() {
        console.log("Submit", this.state.bio);

        const data = { bio: this.state.bio };
        axios
            .post("/profile/bio", data)
            .then((response) => {
                console.log("Bio Response data", response.data);
                this.props.setBio(response.data.bio);
            })
            .catch((err) => {
                console.log(err);
            });

        this.setState({ editMode: false });
    }

    render() {
        console.log("Props in Bio Editor", this.props);

        if (this.state.editMode) {
            return (
                <>
                    <h1>Bio Editor</h1>
                    <textarea
                        name="bio"
                        defaultValue={this.props.bio}
                        onChange={(e) => this.handleChange(e)}
                    ></textarea>
                    <button onClick={() => this.submitBio()}>Save Bio</button>
                </>
            );
        } else {
            return (
                <>
                    <p>Non Editor Mode</p>
                    <p name="bio" onChange={(e) => this.handleChange(e)}>
                        {this.props.bio}
                    </p>
                    {this.props.bio === null && (
                        <button onClick={() => this.changeMode()}>Add</button>
                    )}
                    {this.props.bio != undefined && (
                        <button onClick={() => this.changeMode()}>Edit</button>
                    )}
                </>
            );
        }
    }
}
