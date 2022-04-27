const sql = require("mssql");
const sqlConfig = {
  user: "sa",
  password: "1234567890",
  database: "Versale",
  server: "localhost",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Search medicine in database

global.share.ipcMain.on("search", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `select * from Stock where Name like '${arg}%' or Code like '${arg}'`
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "search",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get salesman info

global.share.ipcMain.on("salesman", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select * from Salesman where Salesman.Name = 'General'`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "salesman",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get invoice no.

global.share.ipcMain.on("invno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select MAX(InvNo) as InvNo from InvM`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "invno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Customer records
global.share.ipcMain.on("customer", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `select Name,Address,Contact from Customer where Name like '${arg}%' `
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "customer",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Search invoice by invoice no.

global.share.ipcMain.on("searchinvno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `SELECT  InvM.RNDT,InvM.InvNo,Invoice.SNO, Invoice.Code, Invoice.Name, Invoice.Batch, Invoice.STP, Invoice.Bon, Invoice.Stax, Invoice.Qty, Invoice.Disc,InvM.InvTime, InvM.Dat 
from Invoice
INNER JOIN InvM
ON InvM.InvNo =  ${arg} and Invoice.Invno = ${arg};`
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "searchinvno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Save Medicine into database

global.share.ipcMain.on("saveintodatabase", (event, arg) => {
 console.log(arg)
//  const inth = parseInt(arg.InvNo);
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `
          DECLARE @f NVARCHAR(MAX) = N'${JSON.stringify(arg.newInvoice)}'
          DECLARE @i NVARCHAR(MAX) = N'${JSON.stringify(arg.invoiceEdit)}';
          EXECUTE Generate_invoice @files=@f, @insert = @i,@total = ${arg.totalMedicine}, @RNDT = '${arg.RandomNo}', @Inv = ${arg.InvNo};
          `
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "searchinvno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});



