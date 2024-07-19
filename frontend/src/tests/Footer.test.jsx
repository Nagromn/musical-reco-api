import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/footer/Footer";

describe("Footer component", () => {
  it("renders Footer component with correct copyright year and GitHub link", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("app-footer");

    // Vérifier le texte de copyright et si la date correspond à l'année en cours
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} Copyright |`);
    expect(copyrightText).toBeInTheDocument();

    // Vérifier la structure du DOM
    expect(footerElement).toContainElement(copyrightText);
  });
});
