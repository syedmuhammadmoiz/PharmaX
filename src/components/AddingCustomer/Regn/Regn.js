import React from "react";
import "./Regn.css";
const Regn = ({ regn, setRegn, setArea, setCus }) => {
  const toggleRegn = () => {
    setCus(false);
    setArea(false);
    setRegn(true);
  };

  return (
    <>
      <div
        className={`Regn-heading ${regn ? "color" : ""}`}
        onClick={() => toggleRegn()}
      >
        Region
      </div>
      <div className="Regn-cover">
        {regn ? (
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

export default Regn;
