const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Artsem' },
        { id: 2, name: 'Sanek' },
        { id: 3, name: 'Zayats' },
        { id: 4, name: 'Valera' },
        { id: 5, name: 'Andrey' }
    ],
    messages: [
        { id: 1, message: 'Artsem' },
        { id: 2, message: 'Sanek' },
        { id: 3, message: 'Zayats' },
        { id: 4, message: 'Valera' }
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.tipe) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({ id: 4, message: body });
            return state;
        default:
            return state;
    }
}


export const sendMessageCreator = () => ({tipe: 'SEND_MESSAGE'})
export const updateNewMessageBodyCreater = (body) => ({tipe: 'UPDATE_NEW_MESSAGE_BODY', body: body})
export default dialogsReducer;