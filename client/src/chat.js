// import axios from "./axios";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chatMessage, chatMessages } from "./actions";
import { socket } from "./socket";

export default function Chat({ viewerId }) {
    const [message, setMessage] = useState("");

    //const dispatch = useDispatch();
    const textRef = useRef();

    const messageChange = (e) => {
        console.log("e.target: ", e.target.value);
        console.log("textRef: ", textRef);
        setMessage(e.target.value);
        //textRef.current.value = e.target.value;
        console.log("Message: ", message);
    };

    const sendMessage = (e) => {
        console.log("Clicked");

        var date = new Date();

        socket.emit("sendMessage", message, date);
        event.target.value = "";
    };

    // useEffect(() => {
    //     dispatch(chatMessage());
    // }, []);

    useEffect(() => {
        setMessage();
    }, []);

    return (
        <>
            <h4>Chat: </h4>

            <textarea
                // type="text"
                placeholder="chat"
                name="chatMessage"
                onChange={(e) => messageChange(e)}
            ></textarea>
            <button onClick={() => sendMessage()}>Send</button>
            {/* <button onClick={() => dispatch(chatMessage())}>Send</button> */}
        </>
    );
}
