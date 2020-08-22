import axios from "axios";

const initialState ={
    user: {},
    profile: {},
    
}

const GET_USER_INFO = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';
const GET_PROFILE = 'GET_PROFILE';


export function getUser(userObj){
    return {
        type: GET_USER_INFO,
        payload: userObj
    }
}
export function clearUser(){
    return {
        type: CLEAR_USER,
        payload: {}
    }
}

export function getProfile(userObj) {
    return {
        type: GET_PROFILE,
        payload: userObj
    }
}

export default function reducer(state=initialState, action){
    const {type, payload} = action;
    
    switch(type) {
        case GET_USER_INFO:
            return {...state, user: payload}
        case CLEAR_USER:
            return {...state, user: payload}
        case GET_PROFILE:
            return {...state, profile: payload}
        default: return state
    }

}
