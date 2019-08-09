
export function getAppointmentsForDay(state, day) {

  let dayArray = [];

  for (let item of state.days) {
    if (item.name === day) {
      dayArray = item.appointments
    }
  }

  let result = [];

  for (let dayid of dayArray) {

    for (let key in state.appointments) {
      if (dayid === state.appointments[key].id) {
        result.push((state.appointments[key]))
      }
    }
  }
  return result;
}


export function getInterviewersForDay(state, day) {

  let intArray = [];

  for (let item of state.days) {
    if (item.name === day) {
      intArray = item.interviewers
    }
  }

  let result = [];

  for (let interviewerId of intArray) {

    for (let key in state.interviewers) {
      if (interviewerId === state.interviewers[key].id) {
        result.push((state.interviewers[key]))
      }
    }
  }
  return result;
}



export function getInterview(state, interview) {

  let result = {};

  if (!interview) {
    return null;
  } else {
    let interviewerId = interview.interviewer
    result.student = interview.student
    result.interviewer = {}
    for (let key in state.interviewers) {
      if (interviewerId === state.interviewers[key].id) {
        result.interviewer.id = interviewerId
        result.interviewer.name = state.interviewers[key].name
        result.interviewer.avatar = state.interviewers[key].avatar
      }
    } 
  }
  return result;
}