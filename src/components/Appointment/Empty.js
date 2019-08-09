import React, {useState} from "react";
import "components/Appointment/style.scss"
import {useVisualMode} from "hooks/useVisualMode"



export default function Empty(props) {

  const [student, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [interview, setInterview] = useState(props.interview || null) 

 return (
    <main className="appointment__add">
      <img
        interview={interview}
        interviewer={interviewer}
        name={student}
        className="appointment__add-button"
        src="images/add.png" onClick={props.onAdd}
        alt="Add"
      />
    </main>
  )
}


