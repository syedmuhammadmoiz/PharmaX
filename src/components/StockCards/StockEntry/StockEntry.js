import React from "react";
import "./StockEntry.css";
const StockEntry = ({ entry, setCom, setGen, setCat, setEntry }) => {
  const toggleEn = () => {
    setCom(false);
    setGen(false);
    setCat(false);
    setEntry(true);
  };

  return (
    <>
      <div
        className={`En-heading ${entry ? "color" : ""}`}
        onClick={() => toggleEn()}
      >
        Stock Entry
      </div>
      <div className="Area-cover">
        {entry ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">SNO:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Code:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Name:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Batch:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">GName:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Retail:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">TP:</label>
                  <input className="Regn-input" type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Company ID:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <button className="lablel-regn  button_main">DISC:</button>
            </div>
            <div className="inputs-regn ">
              <div className="inputs-regn">
                <div className="flex-row">
                  <div className="inputs-regn">
                    <label className="lablel-regn">Cost:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                  <div className="inputs-regn">
                    <label className="lablel-regn">Stax:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="inputs-regn">
                    <label className="lablel-regn">STP:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                  <div className="inputs-regn">
                    <label className="lablel-regn">OpQty:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="inputs-regn">
                    <label className="lablel-regn">Qty:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                  <div className="inputs-regn">
                    <label className="lablel-regn">Bouns:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="inputs-regn">
                    <label className="lablel-regn">GID:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                  <div className="inputs-regn input-lasts">
                    <label className="lablel-regn">CTID:</label>
                    <input className="Regn-input" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default StockEntry;
