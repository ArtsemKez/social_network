import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';


let User = ({ user, ...props }) => {
    return <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => {
                        props.unfollow(user.id)
                    }}>Unfollow</button>
                    : <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => {
                        props.follow(user.id)
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
