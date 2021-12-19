import React from "react";
import "./Table.css";

export const Table = () => {
  return (
    <div className="input_table">
      <div className="table-heading">Items</div>
      <form className="enter">
        <input className="input-same-4" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-3" type="text" name="name" />

        <input className="input-same-2" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-1" type="text" name="name" />

        <input className="input-same-2" type="text" name="name" />
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
