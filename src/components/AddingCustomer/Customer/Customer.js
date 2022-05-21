import React,{useState} from "react";
import {ipcRenderer} from 'electron'
import "./Customer.css";
const Customer = ({ Cus, setRegn, setArea, setCus }) => {
  const [custid,setcustid] = useState('')
  const [name,setname] = useState('')
  const [address,setaddress] = useState('')
  const [rid,setrid] = useState('')
  const [aid,setaid] = useState('')
  const [contact,setcontact] = useState('')
  const [cnic,setcnic] = useState('')
  const [type,settype] = useState('')
  
  const submit = (e) => {
    e.preventDefault();
   const  data = {
      CusID:custid,
      Name:name,
      Address:address,
      RID:rid,
      AID:aid,
      Contact:contact,
      CNIC:cnic,
      Type:type
    }
    ipcRenderer.send('addcustomer',data)
  }


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
                  <input className="Regn-input" type="text" value={custid} onChange={(e)=>{setcustid(e.target.value)}} />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Name:</label>
                  <input className="Regn-input"  value={name} onChange={(e)=>{setname(e.target.value)}}  type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Address:</label>
                  <input className="Regn-input"  value={address} onChange={(e)=>{setaddress(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Area ID:</label>
                  <input className="Regn-input"  value={aid} onChange={(e)=>{setaid(e.target.value)}} type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">Region ID:</label>
                  <input className="Regn-input" value={rid} onChange={(e)=>{setrid(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Contact:</label>
                  <input className="Regn-input"  value={contact} onChange={(e)=>{setcontact(e.target.value)}} type="text" />
                </div>
              </div>
              <div className="flex-row">
                <div className="inputs-regn">
                  <label className="lablel-regn">CNIC:</label>
                  <input className="Regn-input" value={cnic} onChange={(e)=>{setcnic(e.target.value)}} type="text" />
                </div>
                <div className="inputs-regn">
                  <label className="lablel-regn">Typ:</label>
                  <input className="Regn-input" type="text"  value={type} onChange={(e)=>{settype(e.target.value)}} />
                </div>
              </div>
              <button className="lablel-regn  button_main" onClick={(e)=>{submit(e)}} >Submit</button>
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
