import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Blabla', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ],
    profile: null,
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state, posts: [newPost, ...state.posts], newPostText: ''
            }
        }
        case SET_USERS_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USERS_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })


export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(Response => {
        dispatch(setUserProfile(Response.data));
    })
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(Response => {
        dispatch(setStatus(Response.data));
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(Response => {
        if (Response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    })
}

export default profileReducer;