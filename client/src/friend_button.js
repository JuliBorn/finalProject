import axios from "./axios";

import { useState, useEffect } from "react";

export default function FriendButton(props) {
    let { viewedId } = props;

    const [viewedUser, setViewedUser] = useState();

    useEffect(() => {
        ///////Mount
        console.log("mounted", viewedId);

        axios
            .get(`/api/users/friendships?viewedId=${viewedId}`)
            .then(({ data }) => {
                console.log(data);
            });
    }, []);

    return (
        <div>
            <button>Submit</button>
        </div>
    );
}
