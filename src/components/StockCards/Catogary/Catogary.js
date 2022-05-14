import React,{useState} from "react";
import "./Catogary.css";
const Catogary = ({ cat, setCom, setGen, setCat, setEntry }) => {
  const [catID, setcatID] = useState("");
  const [catName, setcatName] = useState("");
  const [catNames, setcatNames] = useState("");
  const toggleCat = () => {
    setCom(false);
    setGen(false);
    setCat(true);
    setEntry(false);
  };
  const submit = () =>{
    const data = {
      catID: catID,
      catName: catName,
      catNames: catNames,
    }
    console.log('here')
    console.log(data)
    ipcRenderer.send('catogary', data);
  }
  return (
    <>
      <div
        className={`Cat-heading ${cat ? "color" : ""}`}
        onClick={() => toggleCat()}
      >
        Catogary
      </div>
      <div className="Area-cover">
        {cat ? (
          <div className="Regn-body">
            <div className="inputs-regn">
              <label className="lablel-regn" onChange={(e)=>{setcatID(e.target.value)}} >Catogary ID:</label>
              <input className="Regn-input" type="text" />
              <label className="lablel-regn" onChange={(e)=>{setcatName(e.target.value)}} >Catogary Name:</label>
              <input className="Regn-input" onChange={(e)=>{setcatNames(e.target.value)}} type="text" />

              <button className="lablel-regn  button_main" onClick={(e)=>{submit()}} >Submit</button>
            </div>
            <div className="inputs-regn ">
              <label className="lablel-regn"> Catogaries:</label>
              <input type="text" className="Regn-input " />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Catogary;
