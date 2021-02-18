// import axios from "./axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import getFriends from "./actions";

export default function Friends() {
    //const [friendList, setfriendList] = useState([]);

    const dispatch = useDispatch();

    const friendList = useSelector((state) => {
        return state;
    });

    console.log("Redux State Friendlist", friendList);

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <>
            <h4>Friends</h4>

            {/* {friendList.map(() => (
                <p>{friendList.first}</p>
            ))} */}
        </>
    );
}
