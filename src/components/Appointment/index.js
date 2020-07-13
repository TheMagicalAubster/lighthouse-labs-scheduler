import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import "components/Appointment/styles.scss";
// import Application from "components/Application";



export default function Appointment(props) {
 
  // console.log('props.interviewer from index .....>> ', props.interviewer)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // const CANCEL = "CANCEL";
  // const STATUS = "STATUS";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const CANCELLING = "CANCELLING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const onAdd = () => {
    transition(CREATE);
  }
 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        // alert("aw hellll no");
        transition(ERROR_SAVE, true)
      })
  }

  function onDelete(){
    transition(CONFIRM)
  }

  function onEdit() {
    transition(CREATE)
  }

  function onCancel() {
    back();
  }
  function onClose() {
    transition(EMPTY)
  }

  function onConfirm() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() =>{
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }
  
   
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <div>
    <Header time={props.time} />
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={onEdit}
            onDelete={onDelete}
            />
            )}
        {/* <article className="appointment"></article> */}
        {mode === EMPTY && <Empty onAdd={onAdd} />} 
        {mode === CREATE && <Form 
          interviewers={props.interviewers} 
          onChange={props.interviewers.id}
          // onCreate={props.onCreate}
          onSave={save}
          onCancel={back}/>}
        {mode === SAVING &&  <Status message="Saving"/>}
        {mode === CANCELLING && <Status 
          message="Cancelling"
          onCancel={back}
        />}
        {mode === DELETING && <Status 
          message="Deleting"
          onDelete={onDelete}
        />}
        {/* {mode === SHOW && < Show />} */}
        {mode === CONFIRM && <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
        />}
        {mode === EDIT && <Status 
          onEdit={onEdit}
        />}
        {mode === ERROR_DELETE && <Error message={"Try again another day"} onClose={onClose} />}
        {mode === ERROR_SAVE && <Error message={"Call to confirm"} onClose={back} />}
        </div>
  );
}