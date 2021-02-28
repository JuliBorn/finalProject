import { Component } from "react";
import axios from "axios";

import Bubble from "./bubble";

export default class Chat extends Component {
    constructor() {
        super();
        this.state = { chats: [] };
    }
    componentDidMount() {
        axios.get("/sounds").then((response) => {
            console.log("Response from Server Bubble", response.data);
            this.setState({ chats: response.data });
            console.log(response.data.length, " sounds found");
        });
    }

    render() {
        const elem = this.state.chats.map((elem, index) => {
            let date = new Date(elem.created_at);
            console.log(
                "date",
                date.toLocaleDateString(),
                "time",
                date.toLocaleTimeString()
            );
            return (
                <div key={index}>
                    <Bubble
                        url={elem.sound_url}
                        date={date.toLocaleDateString()}
                        time={date.toLocaleTimeString()}
                    />
                </div>
            );
        });

        return <div className="bubble_container">{elem}</div>;
    }
}
