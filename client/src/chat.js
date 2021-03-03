import { Component } from "react";
import axios from "axios";

import Bubble from "./bubble";

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.chats !== this.state.chats) {
    //         console.log("new props");
    //     }
    // }

    componentWillMount() {
        console.log("Chat props", this.props);
    }
    render() {
        if (this.props.chat) {
            const elem = this.props.chats.map((elem, index) => {
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
        } else {
            return <div>Loading</div>;
        }
    }
}
