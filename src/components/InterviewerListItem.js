import React from "react";

import "components/InterviewerListItem.scss";

import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const interviewerClass = classNames({
    "interviewers__item": true, 
    "interviewers__item--selected":props.selected
  })

  return (
    <li class={interviewerClass} onClick= {props.setInterviewer}
      // () => props.setInterviewer(props.name)}
      >
      <img
        className="interviewers__item-image" 
        src={props.avatar}
        alt={props.name}
        setInterviewer={(interviewer) => props.setInterviewer(interviewer.id)}

        // id={props.id}
      />
      {props.selected ? props.name : null}
    </li>
  );

  }



