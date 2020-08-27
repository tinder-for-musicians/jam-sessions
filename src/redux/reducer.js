import axios from "axios";

const initialState ={
    user: {},
    profile: {},
    instruments: []
    
}

const GET_USER_INFO = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';
const GET_PROFILE = 'GET_PROFILE';
const UPDATE_INSTRUMENTS = 'UPDATE_INSTRUMENTS';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const DELETE_INSTRUMENT = 'DELETE_INSTRUMENT'


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

export function updateInstruments (instruments) {
    return {
        type: UPDATE_INSTRUMENTS,
        payload: instruments
    }
}

export function addInstrument (instrument) {
    return {
        type: ADD_INSTRUMENT,
        payload: axios.post()
        // ADD ENDPOINT FOR DB
    }
}

export function deleteInstrument (instrument) {
    return {
        type: DELETE_INSTRUMENT,
        payload: instrument
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
        case UPDATE_INSTRUMENTS:
            return {...state, instruments: payload}
        case `${ADD_INSTRUMENT}_FULFILLED`:
        return {
            ...state,
            instruments: payload.data
        }
        case `${DELETE_INSTRUMENT}_FULFILLED`:
            return {
                ...state,
                payload: payload.data
            }
        default: return state
    }

}
