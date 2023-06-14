import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("<Button />", () => {
  const setup = () => render(<Button text="example title" />);

  it("renders button title passed by prop", () => {
    const { getByText } = setup();
    const titleText = getByText("example title");

    expect(titleText).toBeTruthy();
  });
});
