import axios from "./axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = { file: null };

        // this.upload = this.upload.bind(this);
    }
    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    upload(e) {
        e.preventDefault();
        console.log("Uploading");
        console.log("Uploading File: ", this.state.file);

        const fd = new FormData();
        fd.append("file", this.state.file);
        console.log("Props in uload(): ", this.props);
        axios
            .post("/profile/profile_pic", fd)
            .then((response) => {
                console.log(
                    "Profile Pic Response from Server: ",
                    response.data.profilePicUrl
                );
                this.props.setProfilePicUrl(response.data.profilePicUrl);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <>
                <div className="UploaderModal">
                    <p>Please upload your Profile Picture</p>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                    <button onClick={(e) => this.upload(e)}>Upload</button>
                </div>
            </>
        );
    }
}
