import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }
  if (!props.profile) { return <Preloader /> }
  return <div className="content">
    <div className={s.DescriptionBlock} >
      <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} />
      {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      <div>{props.profile.fullName}</div>
      <div>{props.profile.aboutMe}</div>
    </div>
  </div>
}

export default ProfileInfo;