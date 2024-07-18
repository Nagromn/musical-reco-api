import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../components/message/Message";

describe("Message component", () => {
  it("renders user message correctly", () => {
    render(<Message sender="user" message="Hello, how are you?" />);

    const userIcon = screen.getByAltText("User Icon");
    const userMessage = screen.getByText("Hello, how are you?");

    expect(userIcon).toBeInTheDocument();
    expect(userMessage).toBeInTheDocument();
  });

  it("renders bot message correctly", () => {
    render(<Message sender="bot" message="I'm doing fine, thank you!" />);

    const botIcon = screen.getByAltText("Bot Icon");
    const botMessage = screen.getByText("I'm doing fine, thank you!");

    expect(botIcon).toBeInTheDocument();
    expect(botMessage).toBeInTheDocument();
  });
});
