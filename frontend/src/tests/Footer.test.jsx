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

    // Vérifier le lien GitHub
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/Nagromn");
    // Vérifier que le lien GitHub n'est pas mort
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Vérifier la structure du DOM
    expect(footerElement).toContainElement(copyrightText);
    expect(footerElement).toContainElement(githubLink);
  });
});
