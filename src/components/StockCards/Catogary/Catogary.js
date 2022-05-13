import React from "react";
import "./Catogary.css";
const Catogary = ({ cat, setCom, setGen, setCat, setEntry }) => {
  const toggleCat = () => {
    setCom(false);
    setGen(false);
    setCat(true);
    setEntry(false);
  };
  return (
    <>
      <div
        className={`Cat-heading ${cat ? "color" : ""}`}
        onClick={() => toggleCat()}
      >
        Catogary
      </div>
      <div className="Area-cover">
        {cat ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <label className="lablel-regn">Catogary ID:</label>
              <input className="Regn-input" type="text" />
              <label className="lablel-regn">Catogary Name:</label>
              <input className="Regn-input" type="text" />

              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Catogaries:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Catogary;
