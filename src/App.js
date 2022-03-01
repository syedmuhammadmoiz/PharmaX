import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./Pages/MainPage/Mainpage";
import InvoiceTable from "./components/Invoice/InputTable/Invoice/InvoiceTable";
import InvoiceView from "./components/Invoice/InputTable/InvoiceView/InvoiceView";
import StockPurchase from "./components/Stock/InputTable/StockPurchase/StockPurchase";
import StockPurchaseView from "./components/Stock/InputTable/StockPurchaseView/StockPurchaseView";
import InvoiceReturn from "./components/Invoice/Return/InvoiceReturn/InvoiceReturn";
import InvoiceReturnView from "./components/Invoice/Return/InvoiceReturnView/InvoiceReturnView";
import StockPurchaseReturn from "./components/Stock/Return/StockPurchaseReturn/StockPurchaseReturn";
import StockPurchaseReturnView from "./components/Stock/Return/StockPurchaseReturnView/StockPurchaseReturnView";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/Invoice" element={<InvoiceTable />}></Route>
        <Route path="/InvoiceView" element={<InvoiceView />}></Route>
        <Route path="/StockPurchase" element={<StockPurchase />}></Route>
        <Route
          path="/StockPurchaseView"
          element={<StockPurchaseView />}
        ></Route>
        <Route path="/InvoiceReturn" element={<InvoiceReturn />}></Route>
        <Route
          path="/InvoiceReturnView"
          element={<InvoiceReturnView />}
        ></Route>
        <Route
          path="/StockPurchaseReturn"
          element={<StockPurchaseReturn />}
        ></Route>
        <Route
          path="/StockPurchaseReturnView"
          element={<StockPurchaseReturnView />}
        ></Route>
      </Routes>
    </HashRouter>
  );
};
export default App;
