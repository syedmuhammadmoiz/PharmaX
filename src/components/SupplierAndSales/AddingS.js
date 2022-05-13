import React, { useState } from "react";
import TopNavBar from "../Common/TopNavBar/TopNavBar";
import Supplier from "./Supplier/Supplier";
import Salesman from "./Salesman/Salesman";
import { Link } from "react-router-dom";
import "./AddingS.css";

const AddingS = () => {
  const [sup, setSup] = useState(false);
  const [sal, setSal] = useState(true);
  return (
    <>
      <TopNavBar />
      <Link to="/" className="back-do link">
        Main Menu
      </Link>
      <div className="Adding_cus_cover">
        <Salesman sal={sal} setSup={setSup} setSal={setSal} />
        <Supplier sup={sup} setSup={setSup} setSal={setSal} />
      </div>
    </>
  );
};

export default AddingS;
