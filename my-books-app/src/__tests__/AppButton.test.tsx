// Button.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppButton from "../components/AppButton";

describe("App Button Component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<AppButton title="Click Me" />);
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeTruthy();
  });

  test("App Button onPress event", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppButton title="Click Me" onPress={onPressMock} />
    );
    const buttonElement = getByText("Click Me");
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
