import React, { useState, useEffect } from "react";
import TableView from "../../../Common/PurchaseTableView/TableView";
import purrev_png from "../../../../../assets/img/purrev.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link } from "react-router-dom";
import "./stockPurchaseReturnView.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const StockPurchaseReturnView = () => {
  const [customer, setCustomer] = useState({});
  const [singleC, setsingleC] = useState({})
  const [returntype, setReturntype] = useState({})
  const [date, setDate] = useState("");
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [invoiceno, setinvoiceno] = useState("");
  const [invoicev, setinvoicev] = useState([]);
  const [total, settotal] = useState(0.0);

  const nevigate = useNavigate();
  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };


  ipcRenderer.on("searchcrdno", (event, arg) => {
    if (arg.length > 0) {
      setinvoicev(arg);
      setCustomer({
        Name: arg[0].SuppName,
        SID: arg[0].SID,
        Address:arg[0].Address
      })
      let InvDate = new Date(arg[0].Dat);
      setDate(InvDate.toLocaleDateString());
      settotal(arg.reduce((total, item) => total + item.STP * item.Qty, 0));
    } else {
    }
  })

  ipcRenderer.on("typereturn", (event, arg) => {
    console.log(arg)
    setReturntype(arg[0])
  });

  const invoicekeydown = (e) => {
    if (e.key === "Enter") {
      if (invoiceno.length === 0) {
        ipcRenderer.send("error", "Please Enter the Card No");
      } else {
        ipcRenderer.send("searchcrdno", invoiceno);
      }
    }
  };
  //clear current data from table
  const cleardata = () => {
    setinvoicev([]);
    setinvoiceno("");
    setDate("");

  };
  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (invoicev.length == 0) {
      console.log("here");
      ipcRenderer.send("error", "Please select the Invoice to Edit");
    } else {
      nevigate(`/StockPurchaseReturn/${invoiceno}`);
    }
  };
  function callfunction() {}
  const sideBarToggle = () => setSideBar(!sideBar);

  useEffect(() => {
    ipcRenderer.send("typereturn")
  }, []);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={purrev_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Purchase Return View</div>
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
                  <label> Supplier: </label>
                  <label> Supp. ID: </label>
                  <label className="last_lable"> Address:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      customerdropdown(e);
                    }}
                    value={customer.Name}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={customer.SID}
                    style={{ textAlign: "center" }}
    
                  />
                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={customer.Address}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label>Type:</label>
                  <label>Date:</label>
                  <label className="last_lable">Card number:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    value={returntype.TypeName}
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
                    value={invoiceno}
                    onChange={(e) => setinvoiceno(e.target.value)}
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

export default StockPurchaseReturnView;
