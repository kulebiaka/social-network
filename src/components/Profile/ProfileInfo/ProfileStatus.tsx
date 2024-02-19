import React, { useState } from "react";
import { setNewStatus } from "../../../redux/profileReducer";
import { useAppDispatch } from "../../../redux/store";

const ProfileStatus = (props: { status: string, isOwner: boolean }) => {

  const [status, setStatus] = useState(props.status)
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    if (status !== props.status) {
      dispatch(setNewStatus(status))
    }
  }
  const onInputStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  return (<>
    {editMode && props.isOwner ?
      (<div>
        <input type="text" autoFocus={true} onChange={onInputStatusChange} onBlur={deactivateEditMode} value={status} />
      </div>)
      :
      (<div >
        <span onDoubleClick={activateEditMode}>{status || '---'}</span>
      </div>)
    }
  </>)
}

export default ProfileStatus