import React from "react";
import "components/Appointment/style.scss"


export default function Confirm(props) {
  return (
    <main class="appointment__card appointment__card--confirm">
      <h1 class="text--semi-bold">{props.message}</h1>
      <section class="appointment__actions">
        <button
          onClick={props.onCancel}
          danger>
          Cancel
        </button>
        <button
          onClick={props.onConfirm}
          danger>
          Confirm
        </button>
      </section>
    </main>
  )
}

