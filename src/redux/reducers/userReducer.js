const initialState = {
    token: localStorage.getItem('token') || null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload
            };
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

export default userReducer;  // Pastikan ini adalah ekspor default
