import React from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  followingProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onFilterChange: (filter: FilterType) => void
};

let Users: React.FC<PropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  ...props
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChange={props.onFilterChange}/>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {props.users.map((u) => (
        <User
          user={u}
          followingProgress={props.followingProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  )
}

export default Users;
