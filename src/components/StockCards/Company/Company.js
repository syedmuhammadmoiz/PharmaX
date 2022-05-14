import React,{useState} from "react";
import "./Company.css";
const Company = ({ com, setCom, setGen, setCat, setEntry }) => {
  const [comID, setcomID] = useState("");
  const[comName, setcomName] = useState("");
  const [comadd, setcomadd] = useState("");
  const [comContact, setcomContact] = useState("");
   const [company, setcompany] = useState("");
   const [shortname,setshortname] = useState("")

    const submit = () =>{
    const data = {
      comID: comID,
      comName: comName,
      comadd: comadd,
      comContact: comContact,
      company: company,
      shortname: shortname,
    }
    console.log('here')
    console.log(data)
    ipcRenderer.send('company', data);
  }
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
                  <input className="Regn-input" onChange={(e)=>{setcomID(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn"onChange={(e)=>{setcomName(e.target.value)}} >Name:</label>
                  <input className="Regn-input" type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Address:</label>
                  <input className="Regn-input"  onChange={(e)=>{setcomadd(e.target.value)}}type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input" onChange={(e)=>{setcomContact(e.target.value)}} type="text" />
                </div>
              </div>
              <label className="lablel-regn">Short Name:</label>
              <input className="Regn-input" onChange={(e)=>{setshortname(e.target.value)}} type="text" />
              <button className="lablel-regn  button_main" onClick={(e)=>{submit()}}>Submit</button>
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
