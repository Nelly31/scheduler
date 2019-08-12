import React, {useState} from "react";
import "components/Appointment/style.scss";

export default function Show(props) {

  const [student, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [interview, setInterview] = useState(props.interview || null) 

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            name={student}
            interviewer={interviewer}
            interview={interview}
            className="appointment__actions-button"
            src="images/edit.png" onClick={(event) => {
              console.log(interviewer.name)
              props.onEdit(student, interviewer.name) 
            }}
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png" onClick={(event) => {
              props.onDelete(props.student) 
            }}
            alt="Delete"
          />
        </section>
      </section>
    </main>
  )
}