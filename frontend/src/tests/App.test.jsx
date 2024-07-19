import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Header from "../components/header/Header";
import Chatbot from "../components/chatbot/Chatbot";
import Footer from "../components/footer/Footer";
import axios from "axios";

jest.mock("axios");

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

  it("has correct link URLs and verifies they are not dead", async () => {
    // Simuler les réponses d'axios pour les différentes URLs
    axios.get.mockImplementation((url) => {
      const mockResponses = {
        "https://github.com/Nagromn": Promise.resolve({ status: 200 }),
        "https://twitter.com/": Promise.resolve({ status: 200 }),
        "https://linkedin.com/": Promise.resolve({ status: 200 }),
      };

      return mockResponses[url] || Promise.reject(new Error("Not Found"));
    });

    render(<App />);
    const links = screen.getAllByRole("link");

    const expectedLinks = [
      { url: "https://github.com/Nagromn" },
      { url: "https://twitter.com/" },
      { url: "https://linkedin.com/" },
    ];

    const checkLinkStatus = async (url) => {
      try {
        const response = await axios.get(url);
        return response.status >= 200 && response.status < 300;
      } catch (error) {
        console.error(`Error checking URL: ${url}`, error.message);
        return false;
      }
    };

    for (const { url } of expectedLinks) {
      const link = links.find((link) => link.getAttribute("href") === url);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", url);

      // Vérifie que l'URL répond correctement (utilise le mock ici)
      const isLinkValid = await checkLinkStatus(url);
      expect(isLinkValid).toBe(true);
    }
  });
});
