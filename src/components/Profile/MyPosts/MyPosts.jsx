import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {
 
  let postElement = props.posts.map (p=> <Post message={p.message} likesCoint={p.likesCoint}/>)

  let newPostElement = React.createRef();

  let newPost =()=>{
    let text = newPostElement.current.value;
    alert(text);
  }


  return (
    <div>
      <div className={s.PostsBlock}>
        <h3>My posts</h3>
        <div>
          <textarea ref= {newPostElement} ></textarea>
        </div>
        <div>
          <button onClick = { newPost } >New post</button>
        </div>
        <div className={s.posts}>
          {postElement}
        </div>
      </div>
    </div>)
}

export default MyPosts;