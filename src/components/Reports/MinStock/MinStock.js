import React from "react";
import "./MinStock.css";

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

const MinStock = ({ min, setMax, setMin, setCus }) => {
  const toggleTol = () => {
    setMin(true);
    setMax(false);
    setCus(false);
  };

  return (
    <>
      <div
        className={`min-heading ${min ? "color" : ""}`}
        onClick={() => toggleTol()}
      >
        Min Stock
      </div>
      <div className="Regn-cover">
        {min ? (
          <div className="Regn-body">
            <div className="input_table ">
              <table className="table_med">
                <thead>
                  <tr>
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
                  <tr>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td></td>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td className="center"></td>
                    <td className="center"></td>
                  </tr>

                  <Emptytables length={1} />
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MinStock;
