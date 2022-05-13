import React from "react";
import "./Customer.css";
const Customer = ({ Cus, setRegn, setArea, setCus }) => {
  const toggleCus = () => {
    setRegn(false);
    setArea(false);
    setCus(true);
  };

  return (
    <>
      <div
        className={`Cus-heading ${Cus ? "color" : ""}`}
        onClick={() => toggleCus()}
      >
        Customer
      </div>
      <div className="Area-cover">
        {Cus ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Customer ID:</label>
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
                  <label className="lablel-regn">Area ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Region ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">CNIC:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Typ:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Customers:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Customer;
