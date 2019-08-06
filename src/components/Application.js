import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment"
import { tsPropertySignature } from "@babel/types";

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
  const [days, setDays] = useState([]) 

  useEffect(() => {
    axios.get('http://localhost:3001/api/days')
      .then((response) => {
        console.log("XXXXXXXXXX",response.data)
        setDays(response.data);
      })
      .catch(error => console.log(error))
  }, [])

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
