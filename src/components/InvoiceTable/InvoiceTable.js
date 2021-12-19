import React from "react";
import { Link } from "react-router-dom";
import { Table } from "./Input Table/Table";
import "./InvoiceTable.css";

const InvoiceTable = () => {
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
            <button className="save">Save Draft</button>
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
              Bill to:
              <input type="text" name="name" />
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
                <input type="text" name="name" />
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
        <Table />
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
            <p> Net total</p> <p> Disc</p> <p>Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
