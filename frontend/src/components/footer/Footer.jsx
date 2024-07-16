import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-24 text-white">
      <p className="text-center">
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
    </div>
  );
};

export default Footer;
