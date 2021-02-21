import axios from "./axios";

// export async function myFunctionActionCreator() {
//     const data = await axios.get("/route");
//     return { type: "UPDATE_STATE_SOMEHOW", data: data.userId };
// }

export async function getFriends() {
    const { data } = await axios.get("/api/users/friends");
    console.log("action get friends", data);
    return { type: "GET_FRIENDS", friendList: data };
}

export async function endFriend(viewedId) {
    const data = { viewedId: viewedId };
    const result = await axios.post(
        "/api/users/friendships/endFriendship",
        data
    );
    console.log("Result accept Friend: ", result);
}

export async function acceptFriend(viewedId) {
    const data = { viewedId: viewedId };
    const result = await axios.post(
        "/api/users/friendships/acceptRequest",
        data
    );
    console.log("Result accept Friend: ", result);

    //return { type: "ACCEPT_FRIEND", friendList: data };
}

export async function cancelFriend(viewedId) {
    const data = { viewedId: viewedId };
    const result = await axios.post(
        "/api/users/friendships/endFriendship",
        data
    );
    console.log("Result cancel Friend: ", result);

    //return { type: "ACCEPT_FRIEND", friendList: data };
}
