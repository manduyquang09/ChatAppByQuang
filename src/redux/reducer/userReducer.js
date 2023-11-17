
const initialState = {
    userData: {},
    Login: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                userData: action.payload,
                login: true
            };
        case "REMOVE_USER":
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
