import React, { useState, useRef, useEffect, useCallback } from "react";

import ModalView from "../Modal/ModalView";
import { ipcRenderer } from "electron";
import "./tableView.css";

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

const TableView = ({
  tableSelect,
  setTableSelect,
  clickToUnSelectTableRow,
  currentinvoicev
}) => {
  const [show, setShow] = useState(false); //show model
  var [data, setdata] = useState([]); //data from database
  var [invoice, setinvoice] = useState([]); //invoice data
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
  }
  useEffect(() => {
    (currentinvoicev.length > 0) ? console.log(currentinvoicev) : setinvoice([])
  }, [currentinvoicev])

  return (
    <div className="input_table ">
      {show ? (
        <ModalView
          modalToggle={modalToggle}
          setShow={setShow}
          data={data}
          senddatatoinvoice={senddatatoinvoice}
          setdata={setdata}
        />
      ) : null}

      <table className="table_med">
        <thead>
          <tr onClick={clickToUnSelectTableRow}>
            <th className="input--1 ">S.NO</th>
            <th className="input-same-1">Code</th>
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

export default TableView;
