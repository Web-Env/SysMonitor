const electron = require('electron');
const { ipcMain, dialog, globalShortcut, systemPreferences } = require('electron');
const url = require('url');
const path = require('path');
const net = require('net');

const version = require('./package.json').version;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
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
            protocol: 'file:',
            slashes: true
        })
    );

    //window.webContents.openDevTools();

    ipcMain.on('app-version', (event, args) => {
        window.webContents.send('app-version', version);
    });

    const PIPE_PATH = '//./pipe/SysMonitor';

    try {
        setInterval(() => {
            var client = net.connect(PIPE_PATH);
            
            client.on('data', (data) => {
                //console.log(data.toString());

                window.webContents.send('report', data.toString());
            });
            
            client.on('end', function() {
                //console.log('Client: on end');
            });
    
            client.on('error', (e) => {
                console.error(e);
            });
        }, 1000);
    }
    catch (e) {
        console.error(e);
    }
});