import React from "react";

import InterviewerListItem from "./InterviewerListItem"

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

let interviewerList = props.interviewers.map((interviewer) => {

return <InterviewerListItem 
  name = {interviewer.name} 
  avatar = {interviewer.avatar} 
  alt = {interviewer.name} 
  selected = {interviewer.id === props.value}
  setInterviewer = {(event) => interviewer.onChange(interviewer.id)}/>
})

return  (
  <section class="interviewers">
  <h4 class="interviewers__header text--light">Interviewer</h4>
  <ul class="interviewers__list">{interviewerList}</ul>
  </section>
  );
}



