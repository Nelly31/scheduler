import React from "react";
import "components/Appointment/style.scss"
import Button from "components/Button.js"


export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button
          onClick={props.onCancel}
          danger>
          Cancel
        </Button>
        <Button
          onClick={props.onConfirm}
          danger>
          Confirm
        </Button>
      </section>
    </main>
  )
}

