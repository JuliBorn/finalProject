import axios from "./axios";

// export async function myFunctionActionCreator() {
//     const data = await axios.get("/route");
//     return { type: "UPDATE_STATE_SOMEHOW", data: data.userId };
// }

export default async function getFriends(userId) {
    const data = await axios.get("/api/users/friends");
    console.log("action get friends", data.data);
    return { type: "GET_FRIENDS", friendList: data.data };
}
