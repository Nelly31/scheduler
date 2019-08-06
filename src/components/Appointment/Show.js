import React from "react";
import "components/Appointment/style.scss";

export default function Show(props) {

  console.log(props)

  return (
    <main class="appointment__card appointment__card--show">
      <section class="appointment__card-left">
        <h2 class="text--regular">{props.student}</h2>
        <section class="interviewer">
          <h4 class="text--light">Interviewer</h4>
          <h3 class="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section class="appointment__card-right">
        <section class="appointment__actions">
          <img
            class="appointment__actions-button"
            src="images/edit.png" onClick={props.onEdit}
            alt="Edit"
          />
          <img
            class="appointment__actions-button"
            src="images/trash.png" onClick={props.onDelete}
            alt="Delete"
          />
        </section>
      </section>
    </main>
  )
}