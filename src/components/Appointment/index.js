import React from "react";
import "components/Appointment/style.scss"

import Empty from 'components/Appointment/Empty.js'
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'
import Form from 'components/Appointment/Form.js'
import Confirm from 'components/Appointment/Confirm.js'
import Error from 'components/Appointment/Error.js'
import Status from 'components/Appointment/Status.js'
import { useVisualMode } from 'hooks/useVisualMode.js'
import { typeParameterInstantiation } from "@babel/types";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const ERROR_DELETING = "ERROR_DELETING"
  const ERROR_SAVING = "ERROR_SAVING"
  const CREATE = "CREATE"
  const EDIT = "EDIT"
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(()=> transition(ERROR_SAVING, true))
  }

  const editing = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING)

    props.editInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(()=> transition(ERROR_SAVING, true))
  }

  const deleting = function (name, interviewer) {
    const interview = {
      student: null,
      interviewer: null
    };

    transition(DELETING)

    props.deleteInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETING, true))
  }

  return (
    <React.Fragment>
      <Header
        time={props.time}
      />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}

      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          name={props.student}
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          student={props.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={editing}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleting}
          onCancel={() => back()}
          message="Are you sure?"
        />
      )}

      {mode === ERROR_DELETING && (
        <Error
        onClose={() => back()}
        message="Error! Could not cancel the appointment" />
      )}

      {mode === ERROR_SAVING && (
        <Error
        onClose={() => back()}
        message="Error! Could not save the appointment" />
      )} 

      {mode === SAVING && (
        <Status message="SAVING" />
      )}

      {mode === DELETING && (
        <Status message="DELETING" />
      )}
    </React.Fragment>
  )
}
