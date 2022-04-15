import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sideNavBar.css";
const SideNavBar = ({ sideBar, sideBarToggle }) => {
  return (
    <>
      <div className="sidebar_icon" onClick={sideBarToggle}></div>

      <div className={"sideNav_cover " + (sideBar ? "sideNav_cover_open" : "")}>
        <div className="sideNav_cover_margin">
          <div className="close_button" onClick={sideBarToggle}></div>
          <Link className="first_link" to="/">
            Main Menu
          </Link>

          <Link className="links" to="/Invoice/0">
            Invoice
          </Link>

          <Link className="links" to="/InvoiceView">
            Invoice View
          </Link>

          <Link className="links" to="/StockPurchase">
            Stock Purchase
          </Link>

          <Link className="links" to="/StockPurchaseView">
            Purchase View
          </Link>

          <Link className="links" to="/InvoiceReturn">
            Invoice Return
          </Link>

          <Link className="links" to="/InvoiceReturnView">
            Inv. Return View
          </Link>

          <Link className="links" to="/StockPurchaseReturn">
            Purchase Return
          </Link>

          <Link className="links" to="/StockPurchaseReturnView">
            Pur. Return View
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
