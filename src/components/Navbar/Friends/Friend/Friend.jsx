import React from 'react'
import s from './Friend.module.css'

const Friend = (props) => {
  return (
    <div className={s.friend}>
      <img src={props.avatar} alt={props.name} />
      <div>{props.name}</div>
    </div>
  )
}

export default Friend