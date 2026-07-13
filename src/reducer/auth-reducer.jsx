export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case 'EMAIL':
            return {
                ...state,
                email: payload.email
            }
        case 'PASSWORD':
            return {
                ...state,
                password: payload.password
            }
        case 'TOKEN':
            return {
                ...state,
                token: payload.token
            }
        case 'LOGOUT':
            return {
                ...state,
                email: "",
                password: "",
                token: ""
            }
        default:
            return state
    }
}