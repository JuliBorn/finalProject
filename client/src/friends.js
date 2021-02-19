// import axios from "./axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import getFriends from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    // console.log("State: ", state);
    const friends = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((user) => user.accepted)
    );

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    // console.log("Friendtotal: ", users);
    // if (!friendList) {
    //     return null;
    // }

    return (
        <>
            <h4>Friends</h4>

            {/* {friendList.map(() => (
                <p>{friendList.first}</p>
            ))} */}
        </>
    );
}
