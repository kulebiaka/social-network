import React, { useState } from "react";
import styles from './ProfileStatus.module.css'
import { setNewStatus } from "../../../redux/profileReducer";
import { useAppDispatch } from "../../../redux";

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

  return (
      (<div className={styles.container}>
    {editMode && props.isOwner ?
        <input type="text" autoFocus={true} onChange={onInputStatusChange} onBlur={deactivateEditMode} value={status} />
        :
        <span className={styles.status} onDoubleClick={activateEditMode}>{status || '---'}</span>
      }
      </div>)
)
}

export default ProfileStatus