import React from "react";

import { storiesOf, getStorybook } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";
import "../src/components/Appointment/style.scss"

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem"
import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointment"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      setInterviewer={action("setInterviewer")}
    />
  ));

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => (
    <Header
      time="12pm"
    />
  ))
  .add("Empty", () => (
    <Empty
      onAdd={action("onAdd")}
    />
  ))
  .add("Appointment Empty", () => (
    <React.Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </React.Fragment>
  ))
  .add("Appointment Booked", () => (
    <React.Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </React.Fragment>
  ))

storiesOf("Show", module)
  .add("Show", () => (
    <Show
      onEdit={action("onEdit")}
      student="Lydia Miller-Jones"
      interviewer={{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }}
    />
  ))

storiesOf("Confirm", module)
  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onCancel={event => action("onCancel")("Cancelled")}
      onConfirm={event => action("onConfirm")("Confirmed")}
    />
  ))

storiesOf("Status", module)
  .add("Status", () => (
    <Status
      message="Deleting"
    />
  ))

storiesOf("Error", module)
  .add("Error", () => (
    <Error
      message="Could not delete appointment"
      onClose={event => action("onClose")("Error")}
    />
  ))

storiesOf("Form", module)
  .add("Form Create", () => (
    <Form
      name=""
      interviewer={null}
      interviewers={interviewers}
      onCancel={event => action("onCancel")("Cancelled")}
      onSave={event => action("onSave")("Saved")}
    />
  ))

storiesOf("Form", module)
  .add("Form Edit", () => (
    <Form
      name="Lydia Miller-Jones"
      interviewer={3}
      interviewers={interviewers}
      selected="selected"
      onCancel={event => action("onCancel")("Cancelled")}
      onSave={event => action("onSave")("Saved")}
    />
  ))


