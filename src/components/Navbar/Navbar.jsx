import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/Profile" activeClassName={s.activLink}> Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/Dialogs" activeClassName={s.activLink}> Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/Users" activeClassName={s.activLink}> Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/News" activeClassName={s.activLink}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/Music" activeClassName={s.activLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/Setting" activeClassName={s.activLink}>Setting</NavLink>
        </div>
    </nav>
}

export default Navbar;