import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment"
import { tsPropertySignature } from "@babel/types";
import { getAppointmentsForDay, getInterview} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}
  });

  const setDay = day => setState({...state, day})
  // const setDays = days => setState({...state, days})
  // const setAppt = appts => setState({...state, appts})
  // const setInterview = interview => setState({...state, interview})

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/days'),
      axios.get('http://localhost:3001/api/appointments'),
      axios.get('http://localhost:3001/api/interviewers')
    ]).then((all) => {
        const [daysResult, apptResult, interviewersResult] = all;
        setState(prev => ({...prev, days: daysResult.data, appointments: apptResult.data, interviewers: interviewersResult.data}))
      })
        .catch(error => console.log(error))
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
    <Appointment 
      key={appointment.id} 
      id={appointment.id} 
      time={appointment.time} 
      interview={interview} 
      />
    );
  })
  
  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
