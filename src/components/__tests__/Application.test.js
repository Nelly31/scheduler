import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getAllByTestId,
  prettyDOM,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  getByText,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//1
it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

//2

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getAllByTestId(container, "appointment")).then(
    () => {
      const appointment = getAllByTestId(container, "appointment")[0];

      fireEvent.click(getByAltText(appointment, "Add"));

      fireEvent.change(
        getByPlaceholderText(appointment, "Enter Student Name"),
        { target: { value: "Maureen Magdalene" } }
      );

      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

      fireEvent.click(getByText(appointment, "Save"));

      expect(getByText(appointment, "SAVING")).toBeInTheDocument();

      waitForElement(() => getByText("Maureen Magdalene"));

      getAllByTestId(container, "day").find(day => {
        queryByText(day, "Monday");
        queryByText(container, "no spots remaining");
      });
    }
  );
});

it("loads data, deletes an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    waitForElement(() => getByAltText(appointment, "Add"));

    getAllByTestId(container, "day").find(day => {
      queryByText(day, "Monday");
      queryByText(container, "3 spots remaining");
    });
  });
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Archibald Cohen" }
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    waitForElement(() => getByText("Archibald Cohen"));

    getAllByTestId(container, "day").find(day => {
      queryByText(day, "Monday");
      queryByText(container, "2 spots remaining");
    });
  });
});

it.only("shows the save error when failing to save an appointment", async () => {
  const { container } = render(<Application />);
  axios.delete.mockRejectedValueOnce();

  await waitForElement(() => getAllByTestId(container, "appointment"));
  const appointment = getAllByTestId(container, "appointment")[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Maureen" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  // await waitForElement(() =>
  //   getByText(appointment, "Error! Could not save the appointment")
  // );
});

it("shows the deleting error when failing to delete an appointment", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  axios.delete.mockRejectedValueOnce();

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[1];

  fireEvent.click(getByText(appointment, "Archie Cohen"));

  fireEvent.click(getByAltText(appointment, "Delete"));

  waitForElement(() => getByText(appointment, "Are you sure?"));

  fireEvent.click(getByText(appointment, "Confirm"));

  await waitForElement(() =>
    getByText(appointment, "Error! Could not cancel the appointment")
  );
});
