import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AppBar from "./components/AppBar";
import AuthForm from "./components/AuthForm";
import "./styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
