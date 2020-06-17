import React from 'react';
import s from './ProfileInfo.module.css'
import { Contacts } from './ProfileInfo';
import { createField, Input, Textarea } from '../../../common/FormsControls/FormsControls';
import { Field, reduxForm } from 'redux-form';
import style from "../../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({error, handleSubmit, ...props }) => {
  return <form onSubmit={handleSubmit} >
    <div><button >Save</button></div>
    {error && <div className={style.formSammaryError}>
            {error}
        </div>}
    <div>
      <b>Full Name</b>: {createField("Full Name", Input, "fullName")}
    </div>
    <div>
      <b>Looking for a job</b>: {createField([], Input, "lookingForAJob", [], "checkbox")}
    </div>
    <div>
      <b>My professional skills</b>: {createField("My professional skills", Textarea, "lookingForAJobDescription")}
    </div>
    <div>
      <b>About me</b>: {createField("About Me", Textarea, "aboutMe")}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
        return <div key={key} className={s.contacts} >
          <b>{key}: {createField(key, Input, "contacts."+key)} </b>
        </div>
      })}
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormReduxForm;