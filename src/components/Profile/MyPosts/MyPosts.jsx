import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";

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

const AddPostFormRedux = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={'textarea'} name={'newPostText'} placeholder='Enter new massage' />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const PostsReduxForm = reduxForm ({form: 'AddPostFormRedux'})(AddPostFormRedux)

export default MyPosts;