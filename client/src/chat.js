// import axios from "./axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chatMessage, chatMessages } from "./actions";

export default function Chat({ viewerId }) {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(chatMessage());
    // }, []);

    useEffect(() => {
        setMessage();
    }, []);

    return (
        <>
            <h4>Chat: </h4>

            <input
                type="text"
                placeholder="chat"
                name="chatMessage"
                onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button onClick={() => dispatch(chatMessage())}>Send</button>
        </>
    );
}
