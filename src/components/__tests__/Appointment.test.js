import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Application";

afterEach(cleanup);

describe("appointments", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});