import usersReducer, { InitialStateType, actions } from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
    state ={
        users: [
            {id: 0, name: 'Artsem 0', followed: false, 
            photos:{small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Artsem 1', followed: false, 
            photos:{small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Artsem 2', followed: true, 
            photos:{small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Artsem 3', followed: true, 
            photos:{small: null, large: null}, status: 'status 3'},
        ],
        pageSize: 50,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingProgress: []
    }
})

test("FollowSuccessTest", () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('UnfollowSuccessTest', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})