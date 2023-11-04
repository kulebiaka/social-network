import React from 'react'
import s from './Friends.module.css'
import Friend from './Friend/Friend'

const Friends = (props) => {

  // let friendsComponents = props.state.map(f => (<Friend name={f.name} avatar={f.avatar}/>))

  return (
    <div className={s.friends}>
      <h5>Friends</h5>
      <div className={s.friends_list}>
        {/* {friendsComponents} */}
      </div>
    </div>
  )
}

export default Friends