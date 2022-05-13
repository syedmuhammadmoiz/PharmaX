import React from "react";
import "./GenericName.css";
const GenericName = ({ gen, setCom, setGen, setCat, setEntry }) => {
  const toggleGen = () => {
    setCom(false);
    setGen(true);
    setCat(false);
    setEntry(false);
  };

  return (
    <>
      <div
        className={`gen-heading ${gen ? "color" : ""}`}
        onClick={() => toggleGen()}
      >
        Generic Name
      </div>
      <div className="Regn-cover">
        {gen ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <label className="lablel-regn">Generic ID:</label>
              <input className="Regn-input" type="text" />
              <label className="lablel-regn">Generic Name:</label>
              <input className="Regn-input" type="text" />

              <button className="lablel-regn  button_main">Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Generic Names:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GenericName;
