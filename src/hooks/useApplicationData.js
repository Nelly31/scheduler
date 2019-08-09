import React, { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData(initial) {
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/days'),
      axios.get('http://localhost:3001/api/appointments'),
      axios.get('http://localhost:3001/api/interviewers')
    ]).then((all) => {
      const [daysResult, apptResult, interviewersResult] = all;
      setState(prev => ({ ...prev, days: daysResult.data, appointments: apptResult.data, interviewers: interviewersResult.data }))
    })
      .catch(error => console.log(error))
  }, []);

  //State object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  //setDay
  const setDay = day => setState({ ...state, day })

  //bookInterview
  //add a new interview obj for the set appointment id
  const bookInterview = function(id, interview) {
    console.log("BOOKING APPT")

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
     return axios.put(`http://localhost:3001/api/appointments/${id}`, {
      interview,
    }) 
      .then(() => {
        setState({
          ...state,
          appointments
        })
    })

  };

  //Delete Interview
  const deleteInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
     return axios.delete(`http://localhost:3001/api/appointments/${id}` ,{ 
       interview,
    })
      .then(() => {
        setState({
          ...state,
          appointments
        })
    })
  };

  return {
    state, 
    setDay, 
    bookInterview, 
    deleteInterview, 
  }
}