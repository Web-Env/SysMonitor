import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer } from 'electron';
import { FansContainerComponent } from './fans-container/fans-container.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'SysMonitor';

    appVersion!: string;

    fans!: Array<number>;

    @ViewChild(FansContainerComponent)
    private fansContainer!: FansContainerComponent;

    private ipc!: typeof ipcRenderer;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.ipc = window.require('electron').ipcRenderer;

        this.ipc.on('report', (event, data) => {
            let jsonData = JSON.parse(data);

            var fanData = jsonData.map((fan: any) => { return fan['Rpm']; });

            if (this.fans === undefined) {
                this.fans = fanData;
                this.changeDetectorRef.detectChanges();
            }
            else {
                this.fansContainer.updateFanSpeeds(fanData);
            }
        });

        this.ipc.on('app-version', (event, data) => {
            if (data != null && data != '') {
                this.appVersion = data;
            }
        });

        this.ipc.send('app-version');
    }
}
