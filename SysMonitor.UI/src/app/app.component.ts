import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'sysmonitor-ui';
    private ipc!: typeof ipcRenderer;

    report = "";

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        // if (this.electronService.isElectronApp) {
        //     try {
                
        //         this.electronService.ipcRenderer.on("report", (event, data) => {
        //             this.report = data;
        //         });
        //     } catch (e) {
        //         throw e;
        //     }
        // } else {
        //     console.warn('App not running inside Electron!');
        // }
        this.ipc = window.require('electron').ipcRenderer;

        this.ipc.on("report", (event, data) => {
            this.report = data;
            this.changeDetectorRef.detectChanges();
        });
    }
}
