import React from 'react';
import Paginator from '../../common/Paginator/Paginator';
import User from './User';



let Users = (props) => {
    return <div>
        <Paginator currentPage={props.currentPage} totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize} onPageChanged={props.onPageChanged} />
        {
            props.users.map(u => <User user={u} fololowingProgess={props.fololowingProgess}
                key={u.id} unfollow={props.unfollow} follow={props.follow} />)
        }
    </div>
}


export default Users;