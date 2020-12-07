import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let User: React.FC<PropsType> = ({ user, followingProgress, follow, unfollow }) => {
    return <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</button>
                    : <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>Follow</button>
                }
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>
        </span>
    </div>
}


export default User;
