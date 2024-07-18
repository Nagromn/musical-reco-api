import React from "react";
import logo from "../../../public/assets/images/jukebox.svg";

const Header = () => {
  return (
    <div
      data-testid="app-header"
      className="flex justify-center items-center h-24"
    >
      <div className="mr-4 w-10 h-10">
        <img src={logo} alt="Jukebox" className="w-10 h-10" />
      </div>
      <h1 className="text-white text-2xl">Chatbot musical</h1>
    </div>
  );
};

export default Header;
