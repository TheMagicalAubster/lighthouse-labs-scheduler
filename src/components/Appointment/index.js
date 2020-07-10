import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Snoop Dog",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "10am",
    interview: {
      student: "Martha Simpson",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "9am",
  }
];

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const onAdd = () => {
    transition(CREATE);
  }
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <div>
    <Header time={props.time} />
      {/* {props.interview && 
      <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
        /> 
        } */}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onClick={props.onEdit}
            onClick={props.onDelete}
            />
            )}
        {/* <article className="appointment"></article> */}
        {mode === EMPTY && <Empty onAdd={onAdd} />} 
        {mode === CREATE && <Form 
          interviewers={ [] }
          onCreate={props.onCreate}
          onCancel={back}/>}
        </div>
  );
}