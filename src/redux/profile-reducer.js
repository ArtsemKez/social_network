const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Artsem', likesCoint: 5 },
        { id: 2, message: 'Sanek', likesCoint: 15 },
        { id: 3, message: 'Zayats', likesCoint: 25 },
        { id: 4, message: 'Valera', likesCoint: 35 }
    ],
    newPostText: ""
};

const profileReducer = (state = initialState, action) => {

    switch (action.tipe) {
        case ADD_POST:
            let newPost = { id: 1, message: state.newPostText, likesCoint: 0 };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}


export const addPostActionCreator = () => ({tipe: 'ADD_POST'})
export const updateNewPostTextActionCreater = (text) => ({tipe: 'UPDATE_NEW_POST_TEXT', newText: text})
export default profileReducer;