import React from "react";
import "./Salesman.css";
const Salesman = ({ sal, setSup, setSal }) => {
  const toggleSal = () => {
    setSup(false);
    setSal(true);
  };

  return (
    <>
      <div
        className={`Sale-heading ${sal ? "color" : ""}`}
        onClick={() => toggleSal()}
      >
        Salesman
      </div>
      <div className="Regn-cover">
        {sal ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Salesman ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Salesman Name:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Address:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Salesman:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Salesman;
