// Button.test.js
import React from "react";
import { render } from "@testing-library/react-native"; 
import AppText from "../components/AppText";

describe("App Test Component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<AppText>hello world</AppText>);
    const textElement = getByText("hello world");
    expect(textElement).toBeTruthy();
  });
});
