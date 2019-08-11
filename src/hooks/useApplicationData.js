import React, { useState, useEffect, useReducer } from "react";
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
    interviewers: {}
  });

  //setDay
  const setDay = day => setState({ ...state, day })

  //bookInterview
  //add a new interview obj for the set appointment id
  const bookInterview = function (id, interview) {

    //function to update the relevant day obj in the day array. 
    function updateObjectInArray(days, id) {
      
      return days.map(day => {
        if (day.appointments.includes(id)) {
          day.spots = day.spots - 1
        }
      
        return {  
          ...days,
          ...day,
        }
      })
      
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const newDays = updateObjectInArray(state.days, id)

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
          appointments,
          days: newDays
        })
      })

  };

  //Delete Interview
  const deleteInterview = function (id, interview) {
    function updateObjectInArray(days, id) {
      
      return days.map(day => {
        if (day.appointments.includes(id)) {
          day.spots = day.spots + 1
        }
      
        return {  
          ...days,
          ...day,
        }
      })
      
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const newDays = updateObjectInArray(state.days, id)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:3001/api/appointments/${id}`, {
      interview,
    })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newDays
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