import React, { useState } from "react";
import { setNewStatus } from "../../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const ProfileStatus = (props) => {
  
  let [state, setState] = useState({tittle: props.status, editMode:false})
  let dispatch = useDispatch()

  const activateEditMode = () => {
    setState({...state, editMode: true})
  }
  const deactivateEditMode = () => {
    setState({...state, editMode: false})
    if(state.tittle !== props.status){

      dispatch(setNewStatus(state.tittle))
    }
  }
  const onInputStatusChange =(e) => {
    setState({...state, tittle: e.target.value})
  }

  return (<>
    { state.editMode ?
    (<div>
      <input type="text" autoFocus={true} onChange={onInputStatusChange} onBlur={deactivateEditMode} value={state.tittle}/>
    </div>)
     :
    (<div >
    <span onDoubleClick={activateEditMode}>{state.tittle || '---'}</span>
  </div>)
    }
  </>)
}

export default ProfileStatus