import React, { useState } from 'react';
import axios from "axios";

export default function useApplicationData(initial) {
  axios.defaults.baseURL = "http://localhost:8001"

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
      setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])
  

  function setSpots(id, isCancelling) {
    const day = state.days.find((d) => d.appointments.includes(id) )
    if(isCancelling) {
      day.spots += 1;
    } else {
      day.spots -= 1; 
    }
    return state.days;
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
        const newDays = setSpots(id)
        setState({
        ...state,
        days: newDays,
        appointments
      }) 
      }) 
      .catch((error) => {
        console.log(error)
        throw error;
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        const newDays = setSpots(id, true)
        setState({
        ...state,
        days: newDays,
        appointments
        })
      }) 
      .catch((error) => {
        console.log(error)
        throw error;
      });
  }
  

return { state, setDay, bookInterview, cancelInterview }
}