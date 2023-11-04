import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://pixlr.com/images/index/remove-bg.webp" alt="" />
      {props.message}

      <div>
        <span>{props.likesCount} likes</span>
      </div>
    </div>
    )
}

export default Post;