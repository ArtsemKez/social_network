import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';
import { followedAPI } from '../../api/api';



let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selektedPage}
                    onClick={(e) => { props.onPageChanged(p) }} >{p + " "}</span>
            })}

        </div>
        {
            props.users.map(users => <div key={users.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + users.id}>
                            <img src={users.photos.small != null ? users.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {users.followed
                            ? <button disabled={props.fololowingProgess.some(id => id === users.id)} onClick={() => {
                                props.toggleIsFololowingProgess(true, users.id);
                                followedAPI.deleteFollow(users.id)
                                    .then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollow(users.id)
                                        }
                                        props.toggleIsFololowingProgess(false, users.id);
                                    })
                            }}>Unfollow</button>
                            : <button disabled={props.fololowingProgess.some(id => id === users.id)} onClick={() => {
                                props.toggleIsFololowingProgess(true, users.id);
                                followedAPI.postFollow(users.id)
                                    .then(data => {
                                        if (data.resultCode === 0) {
                                            props.follow(users.id)
                                        }
                                        props.toggleIsFololowingProgess(false, users.id);
                                    })
                            }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{users.name}</div>
                        <div>{users.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;