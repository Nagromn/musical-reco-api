import React from "react";
import Chatbot from "./components/chatbot/Chatbot";
import Header from "./components/header/Header";
import "./App.scss";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div
      data-testid="app-container"
      className="font-roboto bg-gradient-to-r from-pink-500 to-violet-600"
    >
      <Header />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
