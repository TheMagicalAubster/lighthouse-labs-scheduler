
import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import Application from "components/Application";

export default function Form(props) {
  console.log("props is here >>>> ", props);
  console.log("props.interviewer from form.js >>>>  ", props.interviewers)
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
            
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>

        </section>
      </section>
    </main>



  )
}





