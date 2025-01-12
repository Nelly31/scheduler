import React, {useState} from "react";
import "components/Appointment/style.scss"

export default function Empty(props) {

  const [student] = useState(props.name || "");
  const [interviewer] = useState(props.interviewer || null);
  const [interview] = useState(props.interview || null) 

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


