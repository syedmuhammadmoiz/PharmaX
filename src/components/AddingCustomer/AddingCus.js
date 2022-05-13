import React, { useState } from "react";
import Area from "./Area/Area";
import Regn from "./Regn/Regn";
import TopNavBar from "../Common/TopNavBar/TopNavBar";
import Customer from "./Customer/Customer";
import { Link } from "react-router-dom";

import "./AddingCus.css";
const AddingCus = () => {
  const [regn, setRegn] = useState(true);
  const [area, setArea] = useState(false);
  const [Cus, setCus] = useState(false);

  return (
    <>
      <TopNavBar />
      <Link to="/" className="back-do link">
        Main Menu
      </Link>
      <div className="Adding_cus_cover">
        <Regn regn={regn} setRegn={setRegn} setArea={setArea} setCus={setCus} />
        <Area area={area} setRegn={setRegn} setArea={setArea} setCus={setCus} />
        <Customer
          Cus={Cus}
          setRegn={setRegn}
          setArea={setArea}
          setCus={setCus}
        />
      </div>
    </>
  );
};

export default AddingCus;
