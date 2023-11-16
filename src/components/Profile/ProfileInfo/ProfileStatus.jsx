import React, { useState } from "react";

const ProfileStatus = (props) => {
  
  let [state, setState] = useState({text: 'some', editMode:false})
  console.log(state)
  return (<>
    { state.editMode ?
    (<div>
      <input type="text" onDoubleClick={() => {setState({...state, editMode: false})}} value={state.text}/>
    </div>)
     :
    (<div >
    <span onDoubleClick={() => {setState({...state, editMode: true})}}>{state.text}</span>
  </div>)
    }
  </>)
}

export default ProfileStatus