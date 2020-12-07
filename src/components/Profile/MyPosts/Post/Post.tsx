import React, { Props } from 'react';
import s from './Post.module.css'

type PropsType = {
  message: string
  likesCoint: number
}

const Post: React.FC<PropsType> = ({likesCoint, message}) => {
  return (
    <div>
      <div className={s.item}>
          <img src='https://avatars.mds.yandex.net/get-pdb/1679414/4552ff24-f27b-4f50-b0ad-8b1a7843aaba/s1200'/>
        { message }
        <div>
          <span>Like</span> {likesCoint}
        </div>
      </div>
    </div>)
}

export default Post;