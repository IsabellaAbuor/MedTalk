import React from "react";
import { EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <EuiProvider>
      <BrowserRouter>
      <Routes>
        <Route path ="/login" element={<Login />} />
        <Route path ="/" element={<Dashboard/>} />
        <Route path ="*" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
    </EuiProvider>  
  );
}

export default App;