const path = require('path')
const url = require('url')
const sql = require('mssql')
const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')

let mainWindow

var syncquries = []

let isDev = false
const sqlConfig = {
    user:'sa',
    password:'1234567890',
    database:'Versale',
    server:'localhost',
    options:{
     trustedConnection: true,
     encrypt: true,
     enableArithAbort: true,
     trustServerCertificate: true,
    }
}

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		show: false,
		icon: `${__dirname}/assets/icon.png`,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}
	

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createMainWindow)

const syncing  = () => {
	var conn = new sql.ConnectionPool(sqlConfig);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        request.query(`select * from Stock`).then(function (recordset) {
			syncquries = recordset.recordset
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });

	const connection = new Connection(config);
	// Create connection to database
		const config = {
		authentication: {
			options: {
			userName: "medicineserver", // update me
			password: "Light299792458" // update me
			},
			type: "default"
		},
		server: "medicineserver.database.windows.net", // update me
		options: {
			database: "medicine", //update me
			encrypt: true
		}
		};
		// Attempt to connect and execute queries if connection goes through
		connection.on("connect", err => {
		if (err) {
			console.error(err.message);
		} else {
			queryDatabase();
		}
		});
		// for (int i=0 ;i < syncquries.length ; i++) {
		// 	const request = new Request(syncquries[i].query,
		// 		(err, rowCount) => {
		// 		if (err) {
		// 			console.error(err.message);
		// 		} else {
		// 			console.log(`${rowCount} row(s) returned`);
		// 		}
		// 		}
		// 	);
		// }

		
}


ipcMain.on('search',(event,arg)=>{
	var conn = new sql.ConnectionPool(sqlConfig);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        request.query(`select * from Stock where Name like '${arg}%'`).then(function (recordset) {
			mainWindow.webContents.send('search',recordset.recordset)
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
        console.log('connection is created');
    }).catch(function (err) {
        console.log(err);
    });
	
})
ipcMain.on('runqurey',(event,arg)=>{
	const object = (arg.map(o =>o.Code))
	let qurey = `update Medicine  set packing = packing-1 where Code in ('${object.join("','")}')`;
	var conn = new sql.ConnectionPool(sqlConfig);
	conn.connect().then(function () {
		var request = new sql.Request(conn);
		request.query(qurey).then(function (recordset) {
			console.log(recordset)
			conn.close();
		}).catch(function (err) {
			console.log(err);
			conn.close();
		});
		var request = new sql.Request(conn);
		qurey = `update Medicine  set packing = packing-1 where Code in (''${object.join("'',''")}'')`;
		const newqurey = `insert into Qurey (quries) values ('${qurey}')`;
		console.log(newqurey)
		request.query(newqurey).then(function (recordset) {	
			conn.close();
		}).catch(function (err) {
			console.log(err);
			conn.close();
		});
	})
})


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
