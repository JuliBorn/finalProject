// import getFriends from "/actions";

export function reducer(state, action) {
    if (action.type == "GET_FRIENDS") {
        //console.log("Reducer File Get Friends", state);
        state = {
            friendList: action.friendList,
        };
    }

    return state;
}
