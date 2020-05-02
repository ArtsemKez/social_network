import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from "redux-form";
import {  required, maxLengthCreater } from '../../../utils/validators/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';

const MyPosts = (props) => {
  let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

  const onAddPost = (value) => {
    props.addPost(value.newPostText);
} 

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <PostsReduxForm onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}

const maxLength10 = maxLengthCreater(10);

const AddPostFormRedux = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={'newPostText'} placeholder='Enter new massage'
        validate={[required, maxLength10]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const PostsReduxForm = reduxForm ({form: 'AddPostFormRedux'})(AddPostFormRedux)

export default MyPosts;