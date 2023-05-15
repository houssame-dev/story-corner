import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from 'antd';
import Home from "./components/Home";
import AppBar from "./components/AppBar";
import AuthForm from "./components/AuthForm";
import PageFooter from './components/PageFooter';
import "./styles.css"



const App = () => {
  return (
    <BrowserRouter>
      <Layout id="layout">
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authform" element={<AuthForm />} />
        </Routes>
        <PageFooter />
      </Layout>
    </BrowserRouter>

  )
}

export default App

