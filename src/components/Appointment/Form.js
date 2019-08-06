import React, {useState} from "react";
import "components/Appointment/style.scss"
import InterviewerList from "components/InterviewerList.js"
import Button from "components/Button.js"

export default function Form(props) {
  console.log(props);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name} 
            onChange= {event => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList {...props} 
        value={interviewer}
        onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}