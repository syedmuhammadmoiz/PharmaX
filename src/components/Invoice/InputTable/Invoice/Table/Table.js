import React, { useState, useRef, useEffect } from "react";
import { ipcRenderer } from "electron";
import "./Table.css";

const Table = ({ modalToggle }) => {
  const [show, setshow] = useState(false); //show model
  const [search, setsearch] = useState(""); //search input
  var [data, setdata] = useState([]); //data from database
  var [invoice, setinvoice] = useState([]); //invoice data
  var [currentdata, setcurrentdata] = useState({}); //current data
  const [quantity, setquantity] = useState(null); //quantity of medicine
  const ref = useRef();
  const reset = {
    Bonus: "",
    Code: "",
    STP: "",
    TP: "",
    Price: "",
    Quantity: "",
    Total: "",
    Name: "",
    Batch: "",
  };

  //handle the next input move if input is empty it can't move
  const handleEnter1 = (event) => {
    if (event.key.toLowerCase() === "enter") {
      if (event.target.value.length > 0) {
        if (search != "") {
          setshow(true);
          ipcRenderer.send("search", search);
        } else {
          setdata([]);
        }

        // const form = event.target.form;
        // const index = [...form].indexOf(event.target);
        // form.elements[index + 1].focus();
        // event.preventDefault();
      }
    }
  };

  //handle the Enter event move to the next input
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  //search the input in the database
  const searchindatabase = (e) => {
    setsearch(e.target.value);
  };
  //get the data from the database and send it to the table
  ipcRenderer.on("search", (event, arg) => {
    setdata(arg);
  });

  //generating the invoice
  const senddatatoinvoice = (item) => {
    setshow(!show);
    setcurrentdata(item);
    setsearch(item.Code);
    ref.current?.focus();
  };
  //generating invoice
  const putdataintoinvoice = (e) => {
    if (e.key.toLowerCase() === "enter") {
      setinvoice((invoice) => [...invoice, currentdata]);
      setcurrentdata(reset);
      console.log(currentdata);
    }
  };

  //add Quantity to the invoice useState
  const addquantity = (e) => {
    e.preventDefault();
    setquantity(e.target.value);
  };
  // save invoice to database
  const runqurey = () => {};
  useEffect(() => {
    console.log(currentdata.length);
    console.log(currentdata);
    console.log("here");
  }, [currentdata]);

  return (
    <div className="input_table">
      <table>
        <thead>
          <tr className="enter">
            <th>
              <input className="input--1" type="text" name="name" />
            </th>
            <th>
              <input
                className="input-same-2"
                type="text"
                name="name"
                id="Code"
                onKeyDown={modalToggle}
                value={search}
                onChange={(e) => {
                  searchindatabase(e);
                }}
              />
            </th>
            <th>
              <input
                className="input-same-3"
                type="text"
                name="name"
                id="name"
                onKeyDown={handleEnter}
                value={currentdata.Name}
              />
            </th>
            <th>
              <input
                className="input-same-2"
                type="text"
                name="name"
                value={currentdata.Batch}
                onKeyDown={handleEnter}
              />
            </th>
            <th>
              <input
                className="input-same-1"
                type="text"
                name="name"
                id="SPrice"
                value={currentdata.TP}
              />
            </th>
            <th>
              <input
                className="input-same-1"
                type="text"
                name="name"
                id="Quantity"
                value={quantity}
                onChange={(e) => {
                  addquantity(e);
                }}
                onKeyDown={handleEnter}
              />
            </th>
            <th>
              <input
                className="input-same-1"
                type="text"
                name="name"
                id="Bonus"
                onKeyDown={handleEnter}
                value={currentdata.length == 0 ? "" : currentdata.Bonus}
              />
            </th>
            <th>
              <input
                className="input-same-1"
                type="text"
                name="name"
                id="saleTax"
                onKeyDown={handleEnter}
                value={currentdata.length == 0 ? "" : currentdata.STP}
              />
            </th>
            <th>
              <input
                className="input-same-1"
                type="text"
                name="name"
                id="Bonous"
                onKeyDown={handleEnter}
                value={currentdata.Bonus}
              />
            </th>
            <th>
              <input
                className="input-same-2 last_input"
                type="text"
                name="name"
                id="Total amount"
                value={quantity != null ? quantity * currentdata.TP : ""}
                onKeyDown={putdataintoinvoice}
              />
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th className="input--1 ">S.NO</th>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
