import React from "react";
import "./TotalStock.css";

const TotalStock = ({ max, setMax, setMin, setCus }) => {
  const toggleTol = () => {
    setMin(false);
    setMax(true);
    setCus(false);
  };

  return (
    <>
      <div
        className={`Tol-heading ${max ? "color" : ""}`}
        onClick={() => toggleTol()}
      >
        Max Stock
      </div>
      <div className="Regn-cover">
        {max ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <label className="lablel-regn">Region ID:</label>
              <input className="Regn-input" type="text" />
              <label className="lablel-regn">Region Name:</label>
              <input className="Regn-input" type="text" />
              <label className="lablel-regn">Region ID:</label>
              <input className="Regn-input" type="text" />
              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Regions:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TotalStock;
