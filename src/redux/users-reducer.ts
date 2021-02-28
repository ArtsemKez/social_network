import {APIResponseType} from './../api/api';
import {updateObjectInArray} from "../utils/validators/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)
            }

        case 'SN/USERS/SET_FILTER':
            return {...state, filter: action.payload}

        case 'SN/USERS/SET_USERS':
            return {...state, users: action.users}

        case 'SN/USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}

        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        case 'SN/USERS/SELECT_PAGE_SIZE':
            return  {...state, pageSize: action.pageSize}

        default:
            return state;
    }
}

export const actions = {
    selectPageSize: (pageSize: number) => ({type: 'SN/USERS/SELECT_PAGE_SIZE', pageSize} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    debugger
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter))

        let Response = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(Response.data.items));
        dispatch(actions.setTotalUsersCount(Response.data.totalCount));
    }
}

export const followUnfollowFlow = async (userId: number, dispatch: Dispatch<ActionTypes>, 
                                        apiMethod: (userId: number) => Promise<APIResponseType>,
                                         actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let Response = await apiMethod(userId);
    if (Response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(userId), actions.followSuccess);
    }
}

export const unfollow = (userId: any): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(userId), actions.unfollowSuccess);
    }
}

export default usersReducer;
