import Axios from "axios"
import {UserType} from "../types/types";

export const instance = Axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY": "0a4d5e42-bfac-4525-abce-dd128f2c8444"}
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null

}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
