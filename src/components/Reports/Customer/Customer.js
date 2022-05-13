import React from "react";
import "./Customer.css";

const Customer = ({ Cus, setMax, setMin, setCus }) => {
  const toggleRegn = () => {
    setMin(false);
    setMax(false);
    setCus(true);
  };

  return (
    <>
      <div
        className={`Customer-heading ${Cus ? "color" : ""}`}
        onClick={() => toggleRegn()}
      >
        Customer Details
      </div>
      <div className="Regn-cover">
        {Cus ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <label className="lablel-regn">Customer ID:</label>
              <input className="Regn-input" type="text" />

              <button className="lablel-regn  button_main">Reports</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Customer;
