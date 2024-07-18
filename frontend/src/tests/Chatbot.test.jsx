import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Chatbot from "../components/chatbot/Chatbot";
import Message from "../components/message/Message";

jest.mock("axios"); // Mock axios for testing

describe("Chatbot component", () => {
  beforeEach(() => {
    axios.post.mockClear(); // Clear any previous mock calls to axios.post
  });

  it("renders Message component", () => {
    render(<Message />);
    const messageElement = screen.getByTestId("chatbot-message");
    expect(messageElement).toBeInTheDocument();
  });

  it("sends message to chatbot and receives response", async () => {
    // Mock successful response from axios
    axios.post.mockResolvedValueOnce({
      data: { message: "Hello! How can I help you?" },
    });

    render(<Chatbot />);

    const input = screen.getByPlaceholderText("Message Chatbot");
    const sendButton = screen.getByText("Send");

    // Type a message and click send
    fireEvent.change(input, { target: { value: "Hi there" } });
    fireEvent.click(sendButton);

    // Wait for the loading indicator to disappear
    await waitFor(() => expect(screen.queryByText("Sending...")).toBeNull());

    // Check that the user message and bot response are in the chat history
    expect(screen.getByText("Hi there")).toBeInTheDocument();
    expect(screen.getByText("Hello! How can I help you?")).toBeInTheDocument();

    // Check that axios.post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.APP_URL}/recommend`,
      { message: "Hi there" }
    );
  });

  it("does not send empty message", async () => {
    render(<Chatbot />);

    const sendButton = screen.getByText("Send");

    // Click send without typing a message
    fireEvent.click(sendButton);

    // Wait for any API calls to complete (should not happen)
    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  it("sends message to chatbot by pressing Enter key", async () => {
    // Mock successful response from axios
    axios.post.mockResolvedValueOnce({
      data: { message: "Hello! How can I help you?" },
    });

    render(<Chatbot />);

    const input = screen.getByPlaceholderText("Message Chatbot");

    // Type a message and press Enter
    fireEvent.change(input, { target: { value: "Hi there" } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

    // Wait for the loading indicator to disappear
    await waitFor(() => expect(screen.queryByText("Sending...")).toBeNull());

    // Check that the user message and bot response are in the chat history
    expect(screen.getByText("Hi there")).toBeInTheDocument();
    expect(screen.getByText("Hello! How can I help you?")).toBeInTheDocument();

    // Check that axios.post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.APP_URL}/recommend`,
      { message: "Hi there" }
    );
  });

  it("displays loading message while waiting for chatbot response", async () => {
    // Mock delay in API response
    axios.post.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: { message: "Hello! How can I help you?" },
            });
          }, 1000); // Simulate delay of 1 second
        })
    );

    render(<Chatbot />);

    const input = screen.getByPlaceholderText("Message Chatbot");
    const sendButton = screen.getByText("Send");

    // Type a message and click send
    fireEvent.change(input, { target: { value: "Hi there" } });
    fireEvent.click(sendButton);

    // Check that loading message is displayed
    expect(screen.getByText("Sending...")).toBeInTheDocument();

    // Wait for the loading indicator to disappear
    await waitFor(
      () => {
        expect(screen.queryByText("Sending...")).toBeNull();
      },
      { timeout: 2000 }
    ); // Increase timeout to 2000ms

    // Check that the user message and bot response are in the chat history
    expect(screen.getByText("Hi there")).toBeInTheDocument();
    expect(screen.getByText("Hello! How can I help you?")).toBeInTheDocument();

    // Check that axios.post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.APP_URL}/recommend`,
      { message: "Hi there" }
    );
  });
});
