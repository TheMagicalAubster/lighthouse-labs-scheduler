
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  

  const interviewers = props.interviewers.map(interviewer => {
    return ( 
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.onChange(interviewer.id)}

        />
    );
  });
  
 


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )

}

