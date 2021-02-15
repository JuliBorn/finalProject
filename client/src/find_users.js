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

    // example #2: with async/await
    // useEffect(() => {
    //     let abort = false;
    //     // then this stuff runs SECOND
    //     // (async () => {
    //     //     try {
    //     //         const { data } = await axios.get(
    //     //             `https://spicedworld.herokuapp.com/?q=${country}`
    //     //         );
    //     //         if (!abort) {
    //     //             setCountries(data);
    //     //         }
    //     //     } catch (err) {
    //     //         console.log(err);
    //     //     }
    //     // })();

    //     // cleanup function
    //     // runs before every re-render
    //     return () => {
    //         console.log("country in returned function: ", user);
    //         abort = true;
    //     };
    // }, [user]);

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
                            <p key={index}>{elem.first}</p>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
