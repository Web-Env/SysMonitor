const electron = require("electron");
const { ipcMain, dialog, globalShortcut, systemPreferences } = require("electron");
const url = require("url");
const path = require("path");
const net = require("net");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on("ready", () => {
    window = new BrowserWindow({ 
        width: 2000, 
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    window.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    window.webContents.openDevTools()

    const PIPE_NAME = 'SysMonitor';
    const PIPE_PATH = '//./pipe/SysMonitor';



    try {
        setInterval(() => {
            var client = net.connect(PIPE_PATH, function() {
                //console.log('Client: on connection');
            })
            
            client.on('data', (data) => {
                console.log(data.toString());

                window.webContents.send("report", data.toString());
                //client.end('Thanks!');
            });
            
            client.on('end', function() {
                console.log('Client: on end');
            });
    
            client.on('error', (e) => {
                console.log (e)
            })
        }, 1000);
    }
    catch (e) {
        console.log (e)
    }
});