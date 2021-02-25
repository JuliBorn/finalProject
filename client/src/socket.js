import { io } from "socket.io-client";
import { chatMessages, chatMessage, updateChatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", (msg) => {
            console.log("Socket.js", msg);
            return store.dispatch(chatMessage(msg));
        });

        socket.on("updateChatMessage", (lastMessage) => {
            return store.dispatch(updateChatMessage(lastMessage));
        });
    }

    // socket.on("clientChatMessage", (lastMessage) =>
    //     store.dispatch(showNewMessage(lastMessage))
    // );
};
