// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Invoice from "./components/Invoice";
import ViewInvoice from "./components/ViewInvoice";
import EditInvoice from "./components/EditInvoice";
import axios from "axios";
import { useEffect } from "react";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/view/:id" element={<ViewInvoice />} />
          <Route path="/edit/:id" element={<EditInvoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
