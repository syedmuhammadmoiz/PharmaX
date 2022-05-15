import React,{useState} from "react";
import "./Salesman.css";
import { ipcRenderer } from "electron";
const Salesman = ({ sal, setSup, setSal }) => {
  const [id,setid] = useState(0);
  const [name,setname] = useState('');
  const [address,setaddress] = useState('');
  const [phone,setphone] = useState('');

  const submit =(e)=>{
    e.preventDefault();
   const data = {
      id:id,
      name:name,
      address:address,
      phone:phone
    }
    console.log(data)
    ipcRenderer.send('savesalesman',data)
  }
  
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
                  <input className="Regn-input" value={id} onChange={(e)=>{setid(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn"  >Salesman Name:</label>
                  <input className="Regn-input" type="text" value={name} onChange={(e)=>{setname(e.target.value)}} />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input" value={address} onChange={(e)=>{setaddress(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Address:</label>
                  <input className="Regn-input" value={phone} onChange={(e)=>{setphone(e.target.value)}} type="text" />
                </div>
              </div>
              <button className="lablel-regn  button_main" onClick={(e)=>{submit(e)}}>Submit</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Salesman;
