import React, { useState, useRef, useEffect, useCallback } from "react";
import { ipcRenderer } from "electron";
import "./tableReturnView.css";

const Emptytables = ({ length }) => {
  let row = [];
  if (length < 8) {
    for (let i = length; i < 8; i++) {
      row.push(
        <tr key={i}>
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
      );
    }
  }
  return row;
};

const TableReturnView = ({
  tableSelect,
  setTableSelect,
  clickToUnSelectTableRow,
}) => {
  const [show, setShow] = useState(false); //show model
  const [search, setsearch] = useState(""); //search input
  var [data, setdata] = useState([]); //data from database
  var [invoice, setinvoice] = useState([]); //invoice data
  const [disc, setdisc] = useState(""); //discount

  const [quantity, setquantity] = useState(null); //quantity of medicine
  const modalToggle = () => setShow(!show);
  const ref = useRef();

  const tableSelectToggle = (index) => {
    setTableSelect(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 38) {
      if (tableSelect + 1 > 1) {
        tableSelectToggle(tableSelect - 1);
      }
    } else if (e.keyCode === 40) {
      if (tableSelect + 1 < invoice.length) {
        tableSelectToggle(tableSelect + 1);
      }
    } else if (e.keyCode === 13) {
      onDoubleClicktoedit(index);
    }
  };
  return (
    <div className="input_table ">
      <table className="table_med table_view">
        <thead>
          <tr onClick={clickToUnSelectTableRow}>
            <th className="input--1">S.NO</th>
            <th className="input-same-2">Code</th>
            <th className="input-same-3">Item Name</th>
            <th className="input-same-2">Batch</th>
            <th className="input-same-1">S.Price</th>
            <th className="input-same-1">Bouns</th>
            <th className="input-same-1">S.Tax</th>
            <th className="input-same-1">Qunatity</th>
            <th className="input-same-1">Disc</th>
            <th className="input-same-2">Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.length > 0
            ? invoice.map((item, index) => (
                <tr
                  key={index}
                  className={tableSelect === index ? "select_table" : null}
                  onClick={() => tableSelectToggle(index)}
                  onDoubleClick={() => onDoubleClicktoedit(index)}
                  tabIndex={index}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <td className="center">{item.SNO}</td>
                  <td className="center">{item.Code}</td>
                  <td>{item.Name}</td>
                  <td className="center">{item.Batch}</td>
                  <td className="center">{parseFloat(item.STP.toFixed(2))}</td>
                  <td className="center">{item.Bonus}</td>
                  <td className="center">{parseFloat(item.Stax.toFixed(2))}</td>
                  <td className="center">{item.Quantity}</td>
                  <td className="center">{item.Disc1}</td>
                  <td className="center">
                    {parseFloat(item.Total.toFixed(2))}
                  </td>
                </tr>
              ))
            : ""}
          <Emptytables length={invoice.length} />
        </tbody>
      </table>
    </div>
  );
};

export default TableReturnView;
