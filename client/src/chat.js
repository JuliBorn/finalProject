// import axios from "./axios";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { chatMessage, chatMessages } from "./actions";
import { socket } from "./socket";

export default function Chat({ viewerId }) {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    //const textRef = useRef();

    const allMessages = useSelector((state) => state.messages);

    const messageChange = (e) => {
        console.log("e.target: ", e.target.value);
        //console.log("textRef: ", textRef);
        setMessage(e.target.value);
        //textRef.current.value = e.target.value;
        //console.log("Message: ", message);
    };

    const sendMessage = (e) => {
        console.log("Clicked");

        //var date = new Date();

        socket.emit("chatMessage", message);

        //e.target.value = "";
    };

    // useEffect(() => {
    //
    // }, []);

    // useEffect(() => {
    //     setMessage();
    // }, []);

    return (
        <>
            <h4>Chat: </h4>
            <div>
                {allMessages &&
                    allMessages.map((msg, index) => (
                        <div className="chat_card" key={index}>
                            <p className="chat_text">{msg.chat_message}</p>
                            <p className="chat_user">
                                {msg.first} {msg.last}
                            </p>
                            <p className="chat_date">
                                {/* {msg.created_at.slice(0, 16).replace("T", ",")}: */}
                            </p>
                        </div>
                    ))}
            </div>

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
