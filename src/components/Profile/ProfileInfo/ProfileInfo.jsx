import React, { useState } from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileDataFormReduxForm from './ProfileDataForm';


const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      () => { setEditMode(false) }
    )
  }

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
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      {editMode
        ? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
        : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}
    </div>
  </div>
}

const ProfileData = ({ goToEditMode, ...props }) => {
  return <>
    {props.isOwner && <div><button onClick={goToEditMode} >Edit</button></div>}
    <>
      <b>Looking for a job</b>: {props.profile.lookingForAJob ? "Yes" : "No"}
    </>
    {props.profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me</b>: {props.profile.aboutMe}
    </div>
    <>
      <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
        return <Contacts key={key} contactTitle={key} contactVelue={props.profile.contacts[key]} />
      })}
    </>
  </>
}

export const Contacts = ({ contactTitle, contactVelue }) => {
  return <div className={s.contacts} >
    <b>{contactTitle}</b>: {contactVelue}
  </div>
}

export default ProfileInfo;