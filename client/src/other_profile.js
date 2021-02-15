import axios from "axios";
import { Component } from "react";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("props match", this.props.match.params.id);

        axios
            .get(`/api/profile/${this.props.match.params.id}`)
            .then((response) => {
                console.log("Response ", response.data);

                this.setState({
                    id: response.data.id,
                    first: response.data.first,
                    last: response.data.last,

                    email: response.data.email,
                    profilePicUrl: response.data.profile_pic_url,
                });
            });

        if (this.props.match.params.id == 32) {
            ///check cookie
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <>
                <h4>
                    {this.state.first} {this.state.last}
                </h4>
                <p>{this.state.id}</p>
                <p>{this.state.email}</p>
                {/* <p>{this.state.profilePicUrl}</p> */}
                <img
                    className="profile-pic"
                    src={this.state.profilePicUrl}
                    alt={`${this.state.first} ${this.state.last}`}
                />
            </>
        );
    }
}
