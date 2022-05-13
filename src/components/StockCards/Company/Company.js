import React from "react";
import "./Company.css";
const Company = ({ com, setCom, setGen, setCat, setEntry }) => {
  const toggleCus = () => {
    setCat(false);
    setGen(false);
    setCom(true);
    setEntry(false);
  };

  return (
    <>
      <div
        className={`Com-heading ${com ? "color" : ""}`}
        onClick={() => toggleCus()}
      >
        Company
      </div>
      <div className="Area-cover">
        {com ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Company ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Name:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Address:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <label className="lablel-regn">Short Name:</label>
              <input className="Regn-input" type="text" />
              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Company:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Company;
