const electron = require("electron");
const { ipcMain, dialog, globalShortcut, systemPreferences } = require("electron");
const url = require("url");
const path = require("path");
const net = require("net");
const ipc = require("node-ipc");
const NamedPipes = require("named-pipes");

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
        // const client = net.createConnection(PIPE_PATH, () => {
        //     console.log('connected to server!');
        // });

        // var server = net.createServer(function(stream) {
        //     console.log('Server: on connection')
        
        //     stream.on('data', function(c) {
        //         console.log('Server: on data:', c.toString());
        //     });
        
        //     stream.on('end', function() {
        //         console.log('Server: on end')
        //         server.close();
        //     });
        
        //     stream.write('Take it easy!');
        // });

        // server.on('close',function(){
        //     console.log('Server: on close');
        // })
        
        // server.listen(PIPE_PATH,function(){
        //     console.log('Server: on listening');
        // })
        
        

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

        //var pipe = NamedPipes.connect(PIPE_NAME);

        // ipc.connectTo(PIPE_PATH, () => {
        //     ipc.of.PIPE_PATH.on(
        //         'connect',
        //         function(){
        //             ipc.log('## connected to world ##', ipc.config.delay);
        //             ipc.of.world.emit(
        //                 'app.message',
        //                 {
        //                     id      : ipc.config.id,
        //                     message : 'hello'
        //                 }
        //             );
        //         }
        //     );
        //     ipc.of.PIPE_PATH.on(
        //         'disconnect',
        //         function(){
        //             ipc.log('disconnected from world');
        //         }
        //     );
        //     ipc.of.PIPE_PATH.on(
        //         'app.message',
        //         function(data){
        //             ipc.log('got a message from world : ', data);
        //         }
        //     );
        //     ipc.of.PIPE_PATH.on(
        //         'kill.connection',
        //         function(data){
        //             ipc.log('world requested kill.connection');
        //             ipc.disconnect('world');
        //         }
        //     );
        // });
    }
    catch (e) {
        console.log (e)
    }
    //pipe = NamedPipes.connect('SysMonitor.Service.Pipe');

    // var pipe = NamedPipes.connect('SysMonitor.Service.Pipe');
});