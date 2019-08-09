import React from "react";

import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment"
import { tsPropertySignature } from "@babel/types";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { useVisualMode } from "hooks/useVisualMode"
import {useApplicationData} from "hooks/useApplicationData"

export default function Application(props) {

  //imported from useApplicationData
  const {
    state, 
    setDay, 
    bookInterview, 
    deleteInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        {...appointment}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
        {appointments}
      </section>
    </main>
  );
}
