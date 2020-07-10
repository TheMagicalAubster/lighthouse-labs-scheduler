import React, { useState } from "react";
import axios, { useEffect } from "axios";

import Appointment from "components/Appointment";
import DayList from "components/DayList";
import getAppointmentsForDay, { getInterview } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));



  React.useEffect(() =>{
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all)=>{
      console.log(all[0].data)
      setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)
  // const interview = getInterview(state, appointment.interview)
  
  return (
    
    <main className="layout">
      <section className="sidebar">
        {}
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

      <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => (
          <Appointment {...appointment } key={appointment.id}/>
        ))}
        
      </section>
      
    </main>
  );
  
}
