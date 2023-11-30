import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={props.photoUrl} alt="" />
      {props.message}
      <div>
        <span>{props.likesCount} likes</span>
      </div>
    </div>
    )
}

export default Post;