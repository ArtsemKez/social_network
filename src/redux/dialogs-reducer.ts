const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Sanek' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Zayats' },
        { id: 4, name: 'Valera' }
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Bla Bla Bla' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' }
    ] as Array<MessagesType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state, messages: [...state.messages, { id: 5, message: body }]
            };
        }
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;
