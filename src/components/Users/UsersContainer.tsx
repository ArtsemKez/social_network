import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers, FilterType } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingProgress, getUsersFilter } from '../../redux/users-selectors'
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingProgress: Array<number>
    filter: FilterType
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type OwnPropsType ={

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChange = (filter: FilterType) => {
        const { currentPage, pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingProgress={this.props.followingProgress}
                onFilterChange={this.onFilterChange}
            />}

        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)
