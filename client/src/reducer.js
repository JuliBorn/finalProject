// import getFriends from "/actions";

export function reducer(state = {}, action) {
    if (action.type === "GET_FRIENDS") {
        //console.log("Reducer File Get Friends", state);
        console.log("Reducer File action Get Friends", action.friendList);
        state = { ...state, friendList: action.friendList };
        console.log("Reducer File Get Friends", state.friendList);
    }

    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.map((user) => {
                if (user.id === action.friendId) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
