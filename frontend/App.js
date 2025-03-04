import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import UserTable from "./components/UserTable";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getAllData" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
