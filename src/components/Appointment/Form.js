import React, { useState } from "react";
import "components/Appointment/style.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";

export default function Form(props) {
  const [student, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [interview, setInterview] = useState(props.interview || null);
  const [error, setError] = useState("");

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(student, interviewer);
  }

  return (
    <main
      className="appointment__card appointment__card--create"
      name={student}
      interviewer={interviewer}
      interview={interview}
    >
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={student}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          {...props}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
