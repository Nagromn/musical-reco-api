import React from "react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      data-testid="app-footer"
      className="flex justify-between items-center h-24 text-white px-4"
    >
      <p className="text-center mx-auto">
        &copy; {new Date().getFullYear()} Copyright |{" "}
        <a
          href="https://github.com/Nagromn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          GitHub
        </a>
      </p>
      <div className="flex space-x-4">
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
