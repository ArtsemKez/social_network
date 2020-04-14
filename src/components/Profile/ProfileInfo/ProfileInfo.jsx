import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
  if (!props.profile) { return <Preloader /> }
  return <div className="content">
    <div className={s.avaBlock}>
      <img src='https://securenews.ru/wp-content/uploads/2016/12/Network.jpg' />
    </div>
    <div className={s.DescriptionBlock} >
      <img src={props.profile.photos.large} />
      <div>{props.profile.aboutMe}</div>
    </div>
  </div>
}

export default ProfileInfo;