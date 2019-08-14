import React from "react";

import {
  render,
  cleanup,
  getByPlaceholderText,
  getByTestId,
  fireEvent
} from "@testing-library/react";

import Form from "components/Appointment/Form";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
 
  //1
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  //2
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //3
  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn(x => x);

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form 
      interviewers={interviewers} 
      name="" 
      onSave={onSave} 
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
 
  // Replaced by next test. 
  //4
  // it("calls onSave function when the name is defined", () => {
  //   /* 1. Create the mock onSave function */
  //   const onSave = jest.fn(x => x)

  //   /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
  //   const { queryByText } = render(
  //     <Form 
  //     interviewers={interviewers} 
  //     name="Lydia Miller-Jones" 
  //     onSave={onSave} 
  //     />
  //   );

  //   /* 3. Click the save button */
  //   fireEvent.click(queryByText("Save"));

  //   /* 3. validation is not shown */
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();

  //   /* 4. onSave is called once*/

  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   /* 5. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  //5
  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));
  
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  //6
    it("can successfully save after trying to submit an empty student name", () => {
      const onSave = jest.fn();
      const { getByText, getByPlaceholderText, queryByText } = render(
        <Form interviewers={interviewers} onSave={onSave} />
      );
    
      fireEvent.click(getByText("Save"));
    
      expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
    
      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      });
    
      fireEvent.click(getByText("Save"));
    
      expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
    });

    it("calls onCancel and resets the input field", () => {
      const onCancel = jest.fn();
      const { getByText, getByPlaceholderText, queryByText } = render(
        <Form
          interviewers={interviewers}
          name="Lydia Mill-Jones"
          onSave={jest.fn()}
          onCancel={onCancel}
        />
      );
    
      fireEvent.click(getByText("Save"));
    
      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      });
    
      fireEvent.click(getByText("Cancel"));
    
      expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
