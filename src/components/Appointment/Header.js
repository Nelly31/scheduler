import React from "react";
import "components/Appointment/style.scss"

export default function Application(props) {
  
  return (
    <header class="appointment__time">
      <h4 class="text--semi-bold">{props.time}</h4>
      <hr class="appointment__separator" />
    </header>
  )
}