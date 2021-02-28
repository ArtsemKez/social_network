import React, { useEffect } from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType, requestUsers } from "../../redux/users-reducer";
import { useSelector, useDispatch } from "react-redux";
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingProgress } from "../../redux/users-selectors";
import { useHistory } from "react-router-dom";
import * as queryString from 'query-string'


type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string }


export const Users: React.FC<PropsType> = (props) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingProgress = useSelector(getFollowingProgress)

  const dispatch = useDispatch()
  const history = useHistory()



  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)


    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null }
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true }
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false }
        break;
    }

    dispatch(requestUsers(actualPage = 1, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

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
    dispatch(follow(userId));
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChange={onFilterChange} />
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