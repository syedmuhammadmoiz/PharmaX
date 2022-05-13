import React from "react";
import "./Area.css";
const Area = ({ area, setRegn, setArea, setCus }) => {
  const toggleArea = () => {
    setRegn(false);
    setCus(false);
    setArea(true);
  };
  return (
    <>
      <div
        className={`Area-heading ${area ? "color" : ""}`}
        onClick={() => toggleArea()}
      >
        Area
      </div>
      <div className="Area-cover">
        {area ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Area ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Region ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Short Name:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Salemans ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <label className="lablel-regn">Name:</label>
              <input className="Regn-input" type="text" />
              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Area:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Area;
