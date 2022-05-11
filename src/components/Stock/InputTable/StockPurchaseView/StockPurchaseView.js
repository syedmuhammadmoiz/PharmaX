import React, { useState, useEffect } from "react";
import TableView from "../../../Common/PurchaseTableView/TableView";
import commission_png from "../../../../../assets/img/commission.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link } from "react-router-dom";
import "./StockPurchaseView.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const StockPurchaseView = () => {
  const [customer, setCustomer] = useState("General");
  const [singleC, setsingleC] = useState({});
  const [customers, setcustomers] = useState([]);
  const [salesman, setSalesman] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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

  ipcRenderer.on("salesman", (event, arg) => {
    setSalesman(arg[0].Name);
  });
  ipcRenderer.on("searchinvno", (event, arg) => {
    if (arg.length > 0) {
      setinvoicev(arg);
      let InvDate = new Date(arg[0].Dat);
      setDate(InvDate.toLocaleDateString());
      setTime(arg[0].InvTime);
      settotal(arg.reduce((total, item) => total + item.STP * item.Qty, 0));
    } else {
    }
  });
  ipcRenderer.on("customer", (event, arg) => {
    setsingleC(arg[0]);
  });

  const invoicekeydown = (e) => {
    if (e.key === "Enter") {
      if (invoiceno.length === 0) {
        ipcRenderer.send("error", "Please Enter the Invoice No");
      } else {
        ipcRenderer.send("searchinvno", invoiceno);
      }
    }
  };
  //clear current data from table
  const cleardata = () => {
    setinvoicev([]);
    setinvoiceno("");
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
      nevigate(`/invoice/${invoiceno}`);
    }
  };
  function callfunction() {}
  const sideBarToggle = () => setSideBar(!sideBar);

  useEffect(() => {
    ipcRenderer.send("salesman");
    ipcRenderer.send("customer", customer);
  }, []);

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
                    value={customer}
                    style={{ textAlign: "center" }}
                    list="browsers"
                  />
                  <datalist id="browsers">
                    {customers.map((item, index) => (
                      <option
                        onClick={() => {
                          console.log("here");
                        }}
                        value={item.Name}
                        key={index}
                      >
                        {item.Name}
                      </option>
                    ))}
                  </datalist>
                  <input
                    type="text"
                    name="name"
                    value={customer}
                    style={{ textAlign: "center" }}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={singleC.Contact}
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
                    value={salesman}
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

export default StockPurchaseView;
