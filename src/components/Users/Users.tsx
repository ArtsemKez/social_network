import React, { useEffect } from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, requestUsers } from "../../redux/users-reducer";
import { useSelector, useDispatch } from "react-redux";
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingProgress } from "../../redux/users-selectors";

type PropsType = {
  
};

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow =(userId: number) => {
        dispatch(unfollow(userId))
    }

  return (
    <div>
      <UsersSearchForm onFilterChange={onFilterChange}/>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map((u) => (
        <User
          user={u}
          followingProgress={followingProgress}
          key={u.id}
          unfollow={unfollow}
          follow={follow}
        />
      ))}
    </div>
  )
}