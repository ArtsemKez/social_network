import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type SetAuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean | null): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => (
    {type: "GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl} })

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password:string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages[0];
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData( null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    let captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;
