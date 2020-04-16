import React from 'react';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <header className={s.header}>
    <img src='https://securenews.ru/wp-content/uploads/2016/12/Network.jpg' />
    <div className={s.loginBlock}>
      {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
    </div>
  </header>
}

export default Header;