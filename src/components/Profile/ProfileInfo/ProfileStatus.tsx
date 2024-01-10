import React, { useState } from "react";
import { setNewStatus } from "../../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useAppDispatch } from "../../../redux/store";

const ProfileStatus = (props: {status: string, isOwner: boolean}) => {
  
  let [status, setStatus] = useState<string>(props.status)
  let [editMode, setEditMode] = useState<boolean>(false)
  let dispatch = useAppDispatch()

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    if(status !== props.status){
      dispatch(setNewStatus(status))
    }
  }
  const onInputStatusChange = (e:any) => {
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