import React from 'react';
import profileReducer, { actions } from './profile-reducer';
import {ProfileType} from "../types/types";

it ('Add posts', () => {
    //test data
    let action = actions.addPostActionCreator('Matha facka');
    let state = {
        posts: [
            { id: 1, message: 'Blabla', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ],
        profile: null as ProfileType | null,
        status: "",
        newPostText: ''
    }
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(5);
})
