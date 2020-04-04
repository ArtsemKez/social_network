import React from 'react';
import styles from './users.module.css'

let Users = (props) => {
    if(props.users.length===0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
                    followed: true,
                    fullName: 'Sanek',
                    status: 'Programmer',
                    location: {country: 'Belarus', city: 'Minsk'}
                },
                {
                    id: 2,
                    photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
                    followed: true,
                    fullName: 'Zayats',
                    status: 'Telachka',
                    location: {country: 'Belarus', city: 'Borisov'}
                },
                {
                    id: 3,
                    photoUrl: 'https://s1.1zoom.me/big3/436/355668-admin.jpg',
                    followed: false,
                    fullName: 'Artsem',
                    status: 'I',
                    location: {country: 'Belarus', city: 'Minsk'}
                }
            ]
        )
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={()=> props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={()=> props.follow(u.id)}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
                </div>)
        }
    </div>
}


export default Users;