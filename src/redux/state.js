let state = {
    dialogsPage: {
        dialogs: [
            { id: 1, name: 'Artsem'},
            { id: 2, name: 'Sanek'},
            { id: 3, name: 'Zayats'},
            { id: 4, name: 'Valera'},
            { id: 5, name: 'Andrey'}
        ],
        messages: [
            { id: 1, message: 'Artsem'},
            { id: 2, message: 'Sanek'},
            { id: 3, message: 'Zayats'},
            { id: 4, message: 'Valera'}
        ]
    },
    profilePage: {
        posts: [
            { id: 1, message: 'Artsem', likesCoint: 5},
            { id: 2, message: 'Sanek', likesCoint: 15},
            { id: 3, message: 'Zayats', likesCoint: 25},
            { id: 4, message: 'Valera', likesCoint: 35}
        ]
    }
}

export default state;