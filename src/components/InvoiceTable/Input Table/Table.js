import React,{useState,useEffect,useRef} from "react";
import "./Table.css";
import {ipcRenderer} from 'electron'

export const Table = ({senddata}) => {
  const [show,setshow] = useState(false)  //show model 
  const [search, setsearch] = useState("")  //search input
  var [data, setdata] = useState([])      //data from database
  var [invoice, setinvoice] = useState([])  //invoice data
  var [currentdata, setcurrentdata] = useState({})  //current data
  const [quantity,setquantity] = useState(null) //quantity of medicine
  const ref = useRef()


  //handle the next input move if input is empty it can't move
  const handleEnter1 = (event) =>{
    if(event.key.toLowerCase() === "enter"){
      if(event.target.value.length>0){
        if(search !=''){
          setshow(true)
            ipcRenderer.send('search',search)
        }else{
            setdata([])
          }

        // const form = event.target.form;
        // const index = [...form].indexOf(event.target);
        // form.elements[index + 1].focus();
        // event.preventDefault();
       
      }
    }
  }
   //handle the Enter event move to the next input
   const handleEnter = (event) =>{
    if(event.key.toLowerCase() === "enter"){
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
  }

  //search the input in the database
  const searchindatabase = (e)=>{
    setsearch(e.target.value)
  }
  //get the data from the database and send it to the table
  ipcRenderer.on('search',(event,arg)=>{
    setdata(arg)
  })

  //generating the invoice
  const senddatatoinvoice=(item)=>{
    setshow(!show)
    setcurrentdata(item)
    setsearch(item.Code)
    ref.current?.focus()

  }
  //generating invoice
  const putdataintoinvoice = (e) =>{
     if(e.key.toLowerCase() === "enter"){
       setinvoice(invoice =>[...invoice,currentdata])
       setcurrentdata({})
       console.log(currentdata)
     }
  }

  //add Quantity to the invoice useState
  const addquantity=(e)=>{
    e.preventDefault()
    setquantity(e.target.value)
  }
  // save invoice to database
  const runqurey = () =>{
  }
   useEffect(()=>{
     console.log(currentdata)
   },[currentdata])

  return (
    <div className="input_table">
      <div className="modal-content" style={{display: show ? "block" : "none"}}>
        <button className="close" onClick={()=>{setshow(!show)}} >&times;</button>
        <p>Some text in the Modal..</p>
        {
                data.length == 0 ? <h1>No Data</h1> :
                data.map((item,index)=>(
                    <div key={index} onClick={(index)=>{senddatatoinvoice(item)}}>
                      <h1>{item.Name}</h1>
                    </div>
                )
                )
              }
      </div>
      <div className="table-heading">Items</div>
      <form className="enter">
        <input className="input-same-4" type="text" name="name" />

        <input className="input-same-1" id="Code" onKeyDown={handleEnter1} value={search} onChange={(e)=>{searchindatabase(e)}} type="text" name="name" />

        <input className="input-same-3" id="name"  onKeyDown={handleEnter} value={currentdata.Name} type="text" name="name" />

        <input className="input-same-2" id="Batch" value={currentdata.Batch} onKeyDown={handleEnter}  type="text" name="name" />

        <input  className="input-same-1" id="SPrice" value={currentdata.TP}  type="text" name="name" />

        <input ref={ref} className="input-same-1" id="Quantity" type="text" value={quantity} onChange={(e)=>{addquantity(e)}} onKeyDown={handleEnter} name="name" />

        <input className="input-same-1" id="Bonus"  type="text" onKeyDown={handleEnter} value={(currentdata.length != 0 ) ? currentdata.Bonus :''} name="name" />

        <input className="input-same-1" id="saleTax" type="text" onKeyDown={handleEnter} value={currentdata.STP} name="name" />

        <input className="input-same-1" id="Bonous" type="text" onKeyDown={handleEnter} value={currentdata.Bonus} name="name" />

        <input className="input-same-2" type="text" name="name" id="Total amount" value={(quantity != null) ? quantity*currentdata.TP : ''} onKeyDown={putdataintoinvoice} />
      </form>
      
      <table>
        <thead>
          <tr>
            <th className="input-same-4">SNO</th>
            <th className="input-same-1">Code</th>
            <th className="input-same-3">Item Name</th>
            <th className="input-same-2">Batch</th>
            <th className="input-same-1">S.Price</th>
            <th className="input-same-1">Qunatity</th>
            <th className="input-same-1">Bouns</th>
            <th className="input-same-1">S.Tax</th>
            <th className="input-same-1">Disc</th>
            <th className="input-same-2">Net Amount</th>
          </tr>
        </thead>
        <tbody>
          { invoice.length > 0 ?
                invoice.map((item, index) => (
                    <tr  key={index}>
                      <td>{item.SNO}</td>
                      <td>{item.Code}</td>
                      <td>{item.Name}</td>
                      <td>{item.Batch}</td>
                      <td>{item.Retail}</td>
                      <td>1</td>
                      <td>{item.Bonus}</td>
                      <td>{item.Cost}</td>
                      <td>{item.Disc1}</td>
                      <td>{item.Retail}</td>
                    </tr>
                )) : ''}
         
        </tbody>
      </table>
    </div>
  );
};

//  data.length == 0 ? <h1>No Data</h1> :
//                 data.map((item,index)=>{
//                   return(
//                     <div key={index}>
//                       <h1>{item.Name}</h1>
//                       <h2>{item.Code}</h2>
//                     </div>
//                 )
//               })}