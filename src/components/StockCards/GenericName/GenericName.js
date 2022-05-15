import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "./GenericName.css";
const GenericName = ({ gen, setCom, setGen, setCat, setEntry }) => {
  const [genID, setgenID] = useState("");
  const [genName, setgenName] = useState("");
  const [genNames, setgenNames] = useState("");

  const toggleGen = () => {
    setCom(false);
    setGen(true);
    setCat(false);
    setEntry(false);
  };

  const submit = () => {
    const data = {
      genID: genID,
      genName: genName,
      genNames: genNames,
    };
    console.log("here");
    console.log(data);
    ipcRenderer.send("genericname", data);
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
              <input
                onChange={(e) => {
                  setgenID(e.target.value);
                }}
                value={genID}
                className="Regn-input"
                type="text"
              />
              <label
                onChange={(e) => {
                  setgenName(e.target.value);
                }}
                value={genName}
                className="lablel-regn"
              >
                Generic Name:
              </label>
              <input
                className="Regn-input"
                value={genNames}
                onChange={(e) => {
                  setgenNames(e.target.value);
                }}
                type="text"
              />
              <button
                className="lablel-regn  button_main"
                onClick={() => {
                  submit();
                }}
              >
                Submit
              </button>
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
