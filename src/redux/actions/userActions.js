import axios from 'axios';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/users');
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
            username,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });
        console.error('Login failed:', error);
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};
