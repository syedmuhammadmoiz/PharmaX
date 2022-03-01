import React, { useState } from "react";
import "./Modal.css";
import Close from "../../../../../../assets/img/close.png";

const Modal = ({ modalToggle, setModal }) => {
  const closeModalIfClickedOutside = (e) => {
    if (e.target.className === "modal_cover") {
      setModal(false);
    }
  };
  return (
    <div className="modal_cover" onClick={closeModalIfClickedOutside}>
      <div className="modal">
        <div className="modal_body">
          <div className="modal_header">
            <h2>Search Items</h2>
            <img
              src={Close}
              onClick={modalToggle}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                cursor: "pointer",
                margin: "1rem",
              }}
            />
          </div>

          <input className="modal_input" type="text" />

          <table>
            <thead>
              <tr>
                <th className="input-same-1">Code</th>
                <th className="input-same-3">Item Name</th>
                <th className="input-same-1">Price</th>
                <th className="input-same-1">Quantity</th>
              </tr>
            </thead>
            <tbody className="modal_table_row">
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>

              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
