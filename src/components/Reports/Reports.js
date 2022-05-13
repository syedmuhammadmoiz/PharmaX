import React, { useState } from "react";
import MinStock from "./MinStock/MinStock";
import TotalStock from "./TotalStock/TotalStock";
import "./Report.css";
import Customer from "./Customer/Customer";
import TopNavBar from "../Common/TopNavBar/TopNavBar";

import { Link } from "react-router-dom";

const Reports = () => {
  const [Cus, setCus] = useState(true);
  const [min, setMin] = useState(false);
  const [max, setMax] = useState(false);

  return (
    <>
      <TopNavBar />
      <Link to="/" className="back-do link">
        Main Menu
      </Link>
      <div className="Adding_cus_cover">
        <Customer Cus={Cus} setMax={setMax} setMin={setMin} setCus={setCus} />
        <MinStock min={min} setMax={setMax} setMin={setMin} setCus={setCus} />
        <TotalStock max={max} setMax={setMax} setMin={setMin} setCus={setCus} />
      </div>
    </>
  );
};

export default Reports;
