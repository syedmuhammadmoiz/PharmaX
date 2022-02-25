import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Table } from "./Input Table/Table";
import date from 'date-and-time';
import "./InvoiceTable.css";
import {ipcRenderer} from 'electron'



const InvoiceTable = () => {
  const dt = new Date()
  const cu_time = date.format(dt, 'hh:mm A YYYY/MM/DD') 
  var [time,settime] = useState(cu_time)
  var [search, setsearch] = useState("")
  var [data, setdata] = useState([])
  var [invoice, setinvoice] = useState([])
  var [total, settotal] = useState(0)

  const searchindatabase = (e)=>{
    setsearch(e.target.value)
    if(e.target.value.length>0){
      // ipcRenderer.send('search',e.target.value)
    }else{
      setdata([])
    }
  }
  ipcRenderer.on('search',(event,arg)=>{
    setdata(arg)
  })
  const senddatatoinvoice=(item)=>{
    setinvoice(invoice =>[...invoice,item])
  }
  const runqurey =() =>{
    ipcRenderer.send('runqurey',invoice)
    setinvoice([])

  }
  useEffect(()=>{
    settotal(invoice.reduce((a,c)=>a+c.Retail,0))
  },[invoice])
 
  useEffect(()=>{
    setInterval(()=>{
       const dt = new Date()
       const cu_time = date.format(dt, 'hh:mm A YYYY/MM/DD') 
      settime(cu_time)
    },1000)
  })

  return (
    <div className="background">
      <div className="Contain">
        <div className="back">
          <Link to="/">Back</Link>
        </div>
        <div className="Invoice">
          <div className="Invoice-heading">Create New Invoice</div>
          <div className="Invoice-options">
            <button className="import">Import</button>
            <button className="download">Download</button>
            <hr id="first" />
            <button className="save" onClick={runqurey}>Print</button>
          </div>
        </div>
        <hr />
        <div className="inputs">
          <form className="sales">
            <label>
              Bill from:
              <input type="text" name="name" />
            </label>
            <label>
              Search :
              <input type="text" value={search} onChange={(e)=>{searchindatabase(e)}} name="name" />
              {/* {
                data.length == 0 ? <h1>No Data</h1> :
                data.map((item,index)=>(
                    <div key={index} onClick={(index)=>{senddatatoinvoice(item)}}>
                      <h1>{item.Name}</h1>
                    </div>
                )
                )
              } */}
            </label>
            <label>
              Bill to:
              <input type="text" name="name" />
            </label>
          </form>
          <form className="detail">
            Invoice Detail
            <div className="in_detail">
              <label>
                Invoice date:
                <input type="text" disabled='true' value={time}  name="name" />
              </label>
              <label>
                Payment due date:
                <input type="text" name="name" />
              </label>
            </div>
            <div className="in_detail">
              <label>
                Invoice number:
                <input type="text" name="name" />
              </label>
              <label>
                PO number:
                <input type="text" name="name" />
              </label>
            </div>
            <div className="in_detail">
              <label>
                Currency:
                <input type="text" name="name" />
              </label>
              <label>
                Delivery note number:
                <input type="text" name="name" />
              </label>
            </div>
          </form>
        </div>
        <hr className="dotted" />
        <Table senddata={invoice} />
        <p id="new">+ New invoice line</p>
        <hr className="dotted" />
        <div className="total-area">
          <textarea
            name=""
            id=""
            cols="80"
            rows="5"
            placeholder=" write a description to the recipt...."
          ></textarea>
          <div className="total">
            <p> Net total</p> <p> Disc</p> <p>Total {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
