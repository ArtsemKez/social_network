import {updateObjectInArray} from "../utils/validators/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)
            }

        case 'SET_USERS':
            return {...state, users: action.users}

        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}

        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}


type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let Response = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(Response.data.items));
        dispatch(actions.setTotalUsersCount(Response.data.totalCount));
    }
}

export const followUnfollowFlow = async (userId: number, dispatch: DispatchType, apiMethod: any,
                                         actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let Response = await apiMethod(userId);
    if (Response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(userId), actions.followSuccess);
    }
}

export const unfollow = (userId: any): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(userId), actions.unfollowSuccess);
    }
}

export default usersReducer;
