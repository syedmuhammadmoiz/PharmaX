import React,{useState} from "react";
import "./StockEntry.css";
const StockEntry = ({ entry, setCom, setGen, setCat, setEntry }) => {
    const [SNO,setSNO] = useState('')
    const [code,setcode] = useState('')
    const [name,setname] = useState('')
    const [batch,setbatch] = useState('')
    const [gname,setgname] = useState('')
    const [retail,setretail] = useState('')
    const [com,setcom] = useState('')
    const [stp,setstp] = useState('')
    const [bonus,setbonus] = useState('')
    const [stax,settax] = useState('')
    const [quantity,setquantity] = useState('')
    const [TP,setTP] = useState('')
    const [amount,setamount] = useState('')
  
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
                  <label className="lablel-regn" >SNO:</label>
                  <input className="Regn-input"  value ={SNO} onChange={(e)=>{setSNO(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Code:</label>
                  <input className="Regn-input"  value ={code} onChange={(e)=>{setcode(e.target.value)}} type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Name:</label>
                  <input className="Regn-input"  value ={name} onChange={(e)=>{setname(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn"  >Batch:</label>
                  <input className="Regn-input"  value ={batch} onChange={(e)=>{setbatch(e.target.value)}} type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">GName:</label>
                  <input className="Regn-input"  value ={gname} onChange={(e)=>{setgname(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Retail:</label>
                  <input className="Regn-input" value={retail} onChange={(e)=>{setretail(e.target.value)}} type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn" >TP:</label>
                  <input className="Regn-input" value={TP} onChange={(e)=>{setTP(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Company ID:</label>
                  <input className="Regn-input" value={com} onChange={(e)=>{setCom(e.target.value)}} type="text" />
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
