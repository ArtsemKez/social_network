import React from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return <div className="content">
    <div>
      <img src='https://securenews.ru/wp-content/uploads/2016/12/Network.jpg' />
    </div>
    <div className = {s.DescriptionBlock} >
      Ava + Description
    </div>
  </div>
}

export default ProfileInfo;