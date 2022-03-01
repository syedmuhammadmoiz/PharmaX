import React, { useState } from "react";
import "./Table.css";

const Table = ({ modalToggle }) => {
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
                onClick={modalToggle}
              />
            </th>
            <th>
              <input className="input-same-3" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-2" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-1" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-1" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-1" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-1" type="text" name="name" />
            </th>
            <th>
              <input className="input-same-1" type="text" name="name" />
            </th>
            <th>
              <input
                className="input-same-2 last_input"
                type="text"
                name="name"
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
