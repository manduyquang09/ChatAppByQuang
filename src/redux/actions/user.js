export const setUser = (user) => ({
    type: "SET_USER",
    payload: user
})

export const removeUser = () => ({
    type: 'REMOVE_USER'
})
export const setUserList = (userList) => ({
    type: "SET_USERLIST",
    payload: userList
})