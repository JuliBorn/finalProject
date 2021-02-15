import axios from "axios";
import { Component } from "react";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("props match", this.props.match.params.id);

        axios.get("/profile").then((response) => {
            console.log("Response ", response);
        });

        if (this.props.match.params.id == 32) {
            ///check cookie
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <>
                <p>other Profile</p>
            </>
        );
    }
}
