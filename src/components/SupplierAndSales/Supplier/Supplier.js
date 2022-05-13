import React from "react";
import "./Supplier.css";
const Supplier = ({ sup, setSup, setSal }) => {
  const toggleSup = () => {
    setSal(false);
    setSup(true);
  };
  return (
    <>
      <div
        className={`Sup-heading ${sup ? "color" : ""}`}
        onClick={() => toggleSup()}
      >
        Supplier
      </div>
      <div className="Area-cover">
        {sup ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Supplier ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Supplier Name:</label>
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

              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Supplier:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Supplier;
