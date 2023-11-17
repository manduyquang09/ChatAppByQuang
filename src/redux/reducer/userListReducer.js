const initialState = {
    userList: []
};

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERLIST":
            return {
                ...state,
                userList: action.payload
            };
        default:
            return state;
    }
};

export default userListReducer;