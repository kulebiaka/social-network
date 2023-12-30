import React, { useState } from "react";
import { setNewStatus } from "../../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const ProfileStatus = (props) => {
  
  let [status, setStatus] = useState(props.status)
  let [editMode, setEditMode] = useState(false)
  let dispatch = useDispatch()

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    if(status !== props.status){
      dispatch(setNewStatus(status))
    }
  }
  const onInputStatusChange = (e) => {
    setStatus( e.target.value)
  }

  return (<>
    { editMode && props.isOwner ?
    (<div>
      <input type="text" autoFocus={true} onChange={onInputStatusChange} onBlur={deactivateEditMode} value={status}/>
    </div>)
     :
    (<div >
    <span onDoubleClick={activateEditMode}>{status || '---'}</span>
  </div>)
    }
  </>)
}

export default ProfileStatus