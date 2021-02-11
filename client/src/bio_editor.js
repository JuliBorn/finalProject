import { Component } from "react";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = { editMode: false };
    }

    changeMode() {
        this.setState({ editMode: true });
    }
    render() {
        console.log("Props in Bio Editor", this.props);

        if (this.state.editMode) {
            return (
                <>
                    <h1>Bio Editor</h1>
                    <textarea defaultValue="DEfault Text"></textarea>
                    <button onClick="changeMode">Save Bio</button>
                </>
            );
        } else {
            return (
                <>
                    <p>Non Editor Mode</p>
                    <button onClick="changeMode">Edit</button>
                </>
            );
        }
    }
}
