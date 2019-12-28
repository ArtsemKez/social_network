import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
          <img src='https://avatars.mds.yandex.net/get-pdb/1679414/4552ff24-f27b-4f50-b0ad-8b1a7843aaba/s1200'/>
        { props.message }
        <div>
          <span>Like</span> {props.likesCoint}
        </div>
      </div>
    </div>)
}

export default Post;