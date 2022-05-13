import React, { useState } from "react";
import GenericName from "./GenericName/GenericName";
import Catogary from "./Catogary/Catogary";
import Company from "./Company/Company";
import { Link } from "react-router-dom";
import TopNavBar from "../Common/TopNavBar/TopNavBar";
import StockEntry from "./StockEntry/StockEntry";

const StockCards = () => {
  const [gen, setGen] = useState(true);
  const [cat, setCat] = useState(false);
  const [com, setCom] = useState(false);
  const [entry, setEntry] = useState(false);

  return (
    <>
      <TopNavBar />
      <Link to="/" className="back-do link">
        Main Menu
      </Link>
      <div className="Adding_cus_cover">
        <GenericName
          gen={gen}
          setGen={setGen}
          setCat={setCat}
          setCom={setCom}
          setEntry={setEntry}
        />
        <Catogary
          cat={cat}
          setGen={setGen}
          setCat={setCat}
          setCom={setCom}
          setEntry={setEntry}
        />
        <Company
          com={com}
          setGen={setGen}
          setCat={setCat}
          setCom={setCom}
          setEntry={setEntry}
        />
        <StockEntry
          entry={entry}
          setGen={setGen}
          setCat={setCat}
          setCom={setCom}
          setEntry={setEntry}
        />
      </div>
    </>
  );
};

export default StockCards;
