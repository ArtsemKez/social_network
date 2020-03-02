import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { updateNewPostTextActionCreater, addPostActionCreator } from '../../../redux/profile-reducer';

const MyPosts = (props) => {
 
  let postElement = props.posts.map (p=> <Post message={p.message} likesCoint={p.likesCoint}/>)

  let newPostElement = React.createRef();

  let addPost =()=>{
    props.dispatch(addPostActionCreator());
  }

  let onPostChange =()=>{
    let text = newPostElement.current.value;
    // let action = {tipe: 'UPDATE-NEW-POST-TEXT', newText: text};
    let action = updateNewPostTextActionCreater(text);
    props.dispatch(action);
  }

  return (
    <div>
      <div className={s.PostsBlock}>
        <h3>My posts</h3>
        <div>
          <textarea onChange={onPostChange} placeholder='Add Post' ref= {newPostElement} value={props.newPostText}/>   
        </div>
        <div>
          <button onClick = { addPost } >New post</button>
        </div>
        <div className={s.posts}>
          {postElement}
        </div>
      </div>
    </div>)
}

export default MyPosts;