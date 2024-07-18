import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/header/Header";

describe("Header component", () => {
  it("renders Header component with logo and title", () => {
    render(<Header />);
    const headerElement = screen.getByTestId("app-header");

    // Vérifier que l'image a l'attribut alt
    const logoImage = screen.getByAltText("Jukebox");
    expect(logoImage).toBeInTheDocument();

    // Vérifier que le titre est correct
    const titleElement = screen.getByText("Chatbot musical");
    expect(titleElement).toBeInTheDocument();

    // Vérifier la structure du DOM
    expect(headerElement).toContainElement(logoImage);
    expect(headerElement).toContainElement(titleElement);
  });
});
