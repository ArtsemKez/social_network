// // import profileReducer from "./profile-reducer";
// // import dialogsReducer from "./dialogs-reducer";
// // import sidebarReducer from "./sidebar-reducer";

// // let store = {
// //     _state: {
// //         dialogsPage: {
// //             dialogs: [
// //                 { id: 1, name: 'Artsem' },
// //                 { id: 2, name: 'Sanek' },
// //                 { id: 3, name: 'Zayats' },
// //                 { id: 4, name: 'Valera' },
// //                 { id: 5, name: 'Andrey' }
// //             ],
// //             messages: [
// //                 { id: 1, message: 'Artsem' },
// //                 { id: 2, message: 'Sanek' },
// //                 { id: 3, message: 'Zayats' },
// //                 { id: 4, message: 'Valera' }
// //             ],
// //             newMessageBody: ""
// //         },
// //         profilePage: {
// //             posts: [
// //                 { id: 1, message: 'Artsem', likesCoint: 5 },
// //                 { id: 2, message: 'Sanek', likesCoint: 15 },
// //                 { id: 3, message: 'Zayats', likesCoint: 25 },
// //                 { id: 4, message: 'Valera', likesCoint: 35 }
// //             ],
// //             newPostText: ""
// //         },
// //         sidebar: {}
// //     },

// //     _callSubscriber() {
// //         console.log('Stane changet')
// //     },

// //     getState() {
// //         return this._state;
// //     },

// //     subscribe(observer) {
// //         this._callSubscriber = observer;
// //     },

// //     dispatch(action) {

// //         this._state.profilePage = profileReducer(this._state.profilePage, action);
// //         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
// //         this._state.sidebar = sidebarReducer(this._state.sidebar, action);

// //         this._callSubscriber(this._state);
// //     },
// // }



// // window.store = store;
// // export default store;

// props.setUsers([
//     {
//         id: 1,
//         photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
//         followed: true,
//         fullName: 'Sanek',
//         status: 'Programmer',
//         location: { country: 'Belarus', city: 'Minsk' }
//     },
//     {
//         id: 2,
//         photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
//         followed: true,
//         fullName: 'Zayats',
//         status: 'Telachka',
//         location: { country: 'Belarus', city: 'Borisov' }
//     },
//     {
//         id: 3,
//         photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
//         followed: false,
//         fullName: 'Artsem',
//         status: 'I',
//         location: { country: 'Belarus', city: 'Minsk' }
//     }
// ]
// )