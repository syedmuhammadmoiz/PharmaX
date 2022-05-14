import React, { useState } from "react";
import TableView from "../../../Common/PurchaseTableView/TableView";
import commission_png from "../../../../../assets/img/commission.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link } from "react-router-dom";
import "./StockPurchaseView.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const StockPurchaseView = () => {
  const [supID, setsupID] = useState("");
  const [supName, setsupName] = useState("");
  const [Builty, setBuilty] = useState("");
  const [transport, settransport] = useState("");
  const [date, setDate] = useState("");
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [cardno, setcardno] = useState("");
  const [invoicev, setinvoicev] = useState([]);
  const [total, settotal] = useState(0.0);

  const nevigate = useNavigate();
  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };

  ipcRenderer.on("searchstockno", (event, arg) => {
    console.log(arg);
    if (arg.length > 0) {
      setinvoicev(arg);
      let InvDate = new Date(arg[0].Dat);
      setDate(InvDate.toLocaleDateString());
      setBuilty(arg[0].Builty);
      setsupID(arg[0].SID);
      settransport(arg[0].Transport);
      setsupName(arg[0].Supplier_Name);
      settotal(arg.reduce((total, item) => total + item.STP * item.Qty, 0));
    } else {
    }
  });
  const invoicekeydown = (e) => {
    if (e.key === "Enter") {
      if (cardno.length === 0) {
        ipcRenderer.send("error", "Please Enter the Invoice No");
      } else {
        ipcRenderer.send("searchstockno", cardno);
      }
    }
  };
  //clear current data from table
  const cleardata = () => {
    setinvoicev([]);
    setcardno("");
    setDate("");
    setTime("");
  };
  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (invoicev.length == 0) {
      console.log("here");
      ipcRenderer.send("error", "Please select the Invoice to Edit");
    } else {
      nevigate(`/StockPurchase/${cardno}`);
    }
  };
  function callfunction() {}
  const sideBarToggle = () => setSideBar(!sideBar);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={commission_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Purchase View</div>
              <div className="buttons_Invoice">
                <button className="button_border">Print</button>
                <div className="vertical margin_side"></div>
                <button className=" button_border margin_side">Download</button>
              </div>
            </div>
            <hr />
            <form className="form_row">
              <div className="flex_basis">
                <div className="form_col lable_col">
                  <label> Supplier ID: </label>
                  <label> Supp. Name: </label>
                  <label className="last_lable"> Builty No:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      customerdropdown(e);
                    }}
                    value={supID}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={supName}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={Builty}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label>Transport:</label>
                  <label>Date:</label>
                  <label className="last_lable">Card No:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    value={transport}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    disabled
                    type="text"
                    name="name"
                    value={date}
                    readOnly
                    style={{ textAlign: "center" }}
                  />

                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={cardno}
                    onChange={(e) => setcardno(e.target.value)}
                    onKeyDown={(e) => {
                      invoicekeydown(e);
                    }}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
            </form>
            <hr className="dotted" />
          </div>
          <TableView
            callfunction={callfunction}
            tableSelect={tableSelect}
            setTableSelect={setTableSelect}
            clickToUnSelectTableRow={clickToUnSelectTableRow}
            invoicev={invoicev}
          />
          <div onClick={clickToUnSelectTableRow}>
            <hr className="dotted" />
            <div className="table_buttons">
              <div className="buttons_view">
                <button
                  className="button_main"
                  onClick={(e) => {
                    savetodatabase(e);
                  }}
                >
                  Edit
                </button>

                <button
                  className="button_border "
                  onClick={(e) => {
                    cleardata(e);
                  }}
                >
                  Clear
                </button>
                <Link to="/">
                  <button className="button_border">Exit</button>
                </Link>
              </div>
              <div className="total">
                <div className="col">
                  <div> Net total</div>
                  <div> Disc</div>
                  <div className="final_total">Total</div>
                </div>
                <div className="col">
                  <div> 0.00</div>
                  <div> 0.00</div>
                  <div className="final_total">
                    {parseFloat(total.toFixed(2))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockPurchaseView;
