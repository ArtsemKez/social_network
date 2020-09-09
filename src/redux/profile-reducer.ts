import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        { id: 1, message: 'Blabla', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
};

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state, posts: [...state.posts, newPost], newPostText: ''
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
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId)
            }
        }case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos:action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USERS_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USERS_PROFILE, profile })
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let Response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(Response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let Response = await profileAPI.getStatus(userId)
    dispatch(setStatus(Response.data));
}

export const updateStatus = (status: string) => async (dispatch:any) => {
    let Response = await profileAPI.updateStatus(status)
    if (Response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let Response = await profileAPI.savePhoto(file)
    if (Response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(Response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const Response = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;
    if (Response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: Response.data.messages[0] }));
        return Promise.reject(Response.data.messages[0]);
    }
}

export default profileReducer;
