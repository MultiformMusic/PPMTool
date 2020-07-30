import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';

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

