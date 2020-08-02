import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import JwtDecode from 'jwt-decode';

export const createNewUser = (newUser, history) => async dispatch => {

    try {
        
        await axios.post('/api/users/register', newUser);
        history.push("/login");

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const login = LoginRequest => async dispatch => {

    // post login request
    // extract token
    // store token in LocalStorage
    // set token in header
    // decode token
    // dispatch

    try {

        const res = await axios.post('/api/users/login', LoginRequest);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setJWTToken(token);
        const decoded = JwtDecode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const logout = () => dispatch => {

    localStorage.removeItem('jwtToken');
    setJWTToken(false);

    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}