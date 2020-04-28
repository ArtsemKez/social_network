import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleIsFololowingProgess, 
    getUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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
                fololowingProgess={this.props.fololowingProgess}
            />}

        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        fololowingProgess: state.usersPage.fololowingProgess,
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleIsFololowingProgess, getUsers})
)(UsersContainer)