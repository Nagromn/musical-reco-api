import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Header from "../components/header/Header";
import Chatbot from "../components/chatbot/Chatbot";
import Footer from "../components/footer/Footer";

describe("App component", () => {
  it("renders App component", () => {
    render(<App />);
    const appContainer = screen.getByTestId("app-container");
    expect(appContainer).toBeInTheDocument();
  });

  it("renders Header component", () => {
    render(<Header />);
    const headerElement = screen.getByTestId("app-header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders Chatbot component", () => {
    render(<Chatbot />);
    const chatbotElement = screen.getByTestId("app-chatbot");
    expect(chatbotElement).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("app-footer");
    expect(footerElement).toBeInTheDocument();
  });
});
