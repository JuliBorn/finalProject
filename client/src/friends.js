// import axios from "./axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFriends, acceptFriend, cancelFriend, endFriend } from "./actions";

export default function Friends({ viewerId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    // // console.log("State: ", state);
    const friends = useSelector(
        (state) =>
            state &&
            state.friendList &&
            state.friendList.filter((user) => user.accepted)
    );

    const friends_requests_sent = useSelector(
        (state) =>
            state &&
            state.friendList &&
            state.friendList.filter(
                (user) => !user.accepted && user.sender_id == viewerId
            )
    );

    const friends_requests_got = useSelector(
        (state) =>
            state &&
            state.friendList &&
            state.friendList.filter(
                (user) => !user.accepted && user.sender_id != viewerId
            )
    );

    if (!friends) {
        return null;
    }

    return (
        <>
            <h4>Request you sent: </h4>
            {friends_requests_sent.map((elem, index) => {
                return (
                    <div className="user_card" key={index}>
                        <div>
                            <span>{elem.first}</span> , <span>{elem.last}</span>
                        </div>
                        <button
                            className="button_small"
                            onClick={() => dispatch(cancelFriend(elem.id))}
                        >
                            Cancel
                        </button>
                    </div>
                );
            })}
            <h4>Request you got: </h4>
            {friends_requests_got.map((elem, index) => {
                return (
                    <div className="user_card" key={index}>
                        <div>
                            <span>{elem.first}</span> , <span>{elem.last}</span>
                        </div>
                        <button
                            className="button_small"
                            onClick={() => dispatch(acceptFriend(elem.id))}
                        >
                            Accept
                        </button>
                    </div>
                );
            })}

            <h4>Your Friends</h4>
            {friends.map((elem, index) => {
                return (
                    <div className="user_card" key={index}>
                        <div>
                            <span>{elem.first}</span> , <span>{elem.last}</span>
                        </div>
                        <button
                            className="button_small"
                            onClick={() => dispatch(endFriend(elem.id))}
                        >
                            End
                        </button>
                    </div>
                );
            })}
        </>
    );
}
