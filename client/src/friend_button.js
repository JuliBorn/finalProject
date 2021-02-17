import axios from "./axios";

import { useState, useEffect } from "react";

export default function FriendButton(props) {
    const { viewedId, viewerId } = props;

    const [friendshipStatus, setFriendshipStatus] = useState("");

    const requestFriendship = (e) => {
        e.preventDefault();
        console.log("Request made", e.target);
        const data = { viewedId: viewedId };
        axios
            .post("/api/users/friendships/requestFriend", data)
            .then((response) => {
                console.log("Friendship request made", response);
                setFriendshipStatus("pending_request");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cancelRequest = (e) => {
        e.preventDefault();
        const data = { viewedId: viewedId };
        axios
            .post("/api/users/friendships/endFriendship", data)
            .then((response) => {
                console.log("Response", response);
                setFriendshipStatus("noRequest");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const acceptRequest = (e) => {
        e.preventDefault();

        const data = { viewedId: viewedId };
        axios
            .post("/api/users/friendships/acceptRequest", data)
            .then((response) => {
                console.log("Response", response);
                setFriendshipStatus("accepted");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const endFriendship = (e) => {
        e.preventDefault();
        console.log("End Friendship request made", e.target);
        const data = { viewedId: viewedId };
        axios
            .post("/api/users/friendships/endFriendship", data)
            .then((response) => {
                console.log("Response", response);
                setFriendshipStatus("noRequest");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        ///////Mount
        console.log("mounted", viewedId);

        axios
            .get(`/api/users/friendships?viewedId=${viewedId}`)
            .then(({ data }) => {
                console.log("Data from Server: ", data);

                if (data) {
                    if (data.accepted === true) {
                        setFriendshipStatus("accepted");
                        console.log(
                            "Friendshipstatus accepted?: ",
                            friendshipStatus
                        );
                    } else {
                        console.log("In ELSE block");
                        console.log("Data sender id:", data.sender_id);
                        console.log("Viewer id:", viewerId);

                        if (data.sender_id == viewerId) {
                            console.log("In IF block");
                            setFriendshipStatus("pending_request");
                            console.log(
                                "Friendshipstatus pending request?: ",
                                friendshipStatus
                            );
                        } else {
                            setFriendshipStatus("request_made");
                            console.log(
                                "Friendshipstatus request made?: ",
                                friendshipStatus
                            );
                        }
                    }
                } else {
                    setFriendshipStatus("noRequest");
                    console.log("Friendshipstatus: ", friendshipStatus);
                }
            })
            .catch((err) => {
                setFriendshipStatus("noRequest");
                console.log("Friendshipstatus: ", friendshipStatus, err);
            });
    }, []);

    ////RENDER STUFF
    if (friendshipStatus === "accepted") {
        return (
            <div>
                <button onClick={(e) => endFriendship(e)}>
                    End friendship
                </button>
                <p>{friendshipStatus}</p>
            </div>
        );
    } else if (friendshipStatus === "pending_request") {
        return (
            <div>
                <button onClick={(e) => cancelRequest(e)}>
                    Cancel Friend Request
                </button>
                <p>{friendshipStatus}</p>
            </div>
        );
    } else if (friendshipStatus === "request_made") {
        return (
            <div>
                <button onClick={(e) => acceptRequest(e)}>
                    Accept Friend Request
                </button>
                <p>{friendshipStatus}</p>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={(e) => requestFriendship(e)}>
                    Send Friend Request
                </button>
                <p>{friendshipStatus}</p>
            </div>
        );
    }
}
