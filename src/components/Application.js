import React, { useState } from "react";

import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment"
import { tsPropertySignature } from "@babel/types";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

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
      student: "Bob Smith",
      interviewer: {
        id: 5,
        name: "Mr Teacher",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  }

];

export default function Application(props) {

  const [count, setCount] = useState("Monday")

  const appointmentList = appointments.map(appointment => <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />)
  
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
          days={days}
          day={count}
          setDay={setCount}
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
