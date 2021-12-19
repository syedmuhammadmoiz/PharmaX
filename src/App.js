import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./components/MainPage/Mainpage";
import InvoiceTable from "./components/InvoiceTable/InvoiceTable";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/Invoice" element={<InvoiceTable />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
