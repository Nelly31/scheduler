import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem"

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

let interviewerList = props.interviewers.map((interviewer) => {

return <InterviewerListItem 
  key = {interviewer.id}
  name = {interviewer.name} 
  avatar = {interviewer.avatar} 
  alt = {interviewer.name} 
  selected = {interviewer.id === props.value}
  setInterviewer = {(event) => props.onChange(interviewer.id)}/>
})

return  (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerList}</ul>
  </section>
  );
}


InterviewerList.propTypes = {
// ensure value props is number
value: PropTypes.number,
// ensure onChange prop is function
onChange: PropTypes.func.isRequired
} 



