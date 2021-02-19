// import getFriends from "/actions";

export function reducer(state, action) {
    if (action.type === "GET_FRIENDS") {
        //console.log("Reducer File Get Friends", state);
        console.log("Reducer File action Get Friends", action.friendList);
        state = { ...state, friendList: action.friendList };
        console.log("Reducer File Get Friends", state.friendList);
    }
    return state;
}
