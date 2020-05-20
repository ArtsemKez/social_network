import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';

it ('Add new post', () => {
    //test data
    let action = addPostActionCreator('Matha facka');
    let state = {
        posts: [
            { id: 1, message: 'Blabla', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ]
    }
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(5);
})

it ('Add new post', () => {
    //test data
    let action = deletePost(1);
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(3);
})