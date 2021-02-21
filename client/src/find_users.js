import axios from "./axios";

import { useState, useEffect } from "react";

export default function FindUsers() {
    // passing "" as argument is NOT REQUIRED
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);

    // example #1: without async/await
    useEffect(() => {
        let abort = false;
        ///////Search
        console.log("User: ", user);
        axios.get(`/api/users?input=${user}`).then(({ data }) => {
            console.log("data: ", data);
            if (!abort) {
                setUsers(data);
            }
        });
        return () => {
            abort = true;
        };
    }, [user]);

    useEffect(() => {
        ///////Mount
        console.log("mounted");

        axios.get(`/api/users/latest`).then(({ data }) => {
            console.log("Latest 3 Users: ", data);
            setUsers(data);
        });
    }, []);

    return (
        <div>
            <h1>User</h1>
            <input
                name="user"
                type="text"
                placeholder="seach by first name"
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
            />
            {users.map((elem, index) => {
                return (
                    <>
                        <div key={index} className="user_card">
                            <a href={`/user/${elem.id}`}>{elem.first}</a>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
