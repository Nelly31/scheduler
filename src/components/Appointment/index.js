import React, { useState } from "react";
import "components/Appointment/style.scss"

import Empty from 'components/Appointment/Empty.js'
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'

export default function Appointment(props) {

  return (
    <React.Fragment>
      <Header
        time={props.time}
      />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        /> :
        <Empty />}
    </React.Fragment>
  )
}