import {getAuthUserData} from "./auth-reducer";
import {InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
};

export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS' as const})
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => dispatch(actions.initializedSuccess()))
}

export default appReducer;
