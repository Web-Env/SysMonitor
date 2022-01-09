import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer } from 'electron';
import { FansContainerComponent } from './components/fans-container/fans-container.component';
import { GpuContainerComponent } from "./components/gpu-container/gpu-container.component";
import { gpu } from "./models/gpu.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'SysMonitor';

    appVersion!: string;

    fans!: Array<number>;
    gpu!: gpu;

    @ViewChild(GpuContainerComponent)
    private gpuContainer!: GpuContainerComponent;

    @ViewChild(FansContainerComponent)
    private fansContainer!: FansContainerComponent;

    private ipc!: typeof ipcRenderer;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.ipc = window.require('electron').ipcRenderer;

        this.ipc.on('report', (event, data) => {
            let jsonData = JSON.parse(data);
            
            var fanData = jsonData.Fans.map((fan: any) => { return fan['Rpm']; });
            var gpuData = jsonData.Gpu;

            if (this.gpu === undefined) {
                this.gpu = gpuData;
            }
            else {
                this.gpu = gpuData;
            }

            if (this.fans === undefined) {
                this.fans = fanData;
                this.changeDetectorRef.detectChanges();
            }
            else {
                this.fansContainer.updateFanSpeeds(fanData);
            }

            this.changeDetectorRef.detectChanges();
        });

        this.ipc.on('app-version', (event, data) => {
            if (data !== null && data !== '') {
                this.appVersion = data;
            }
        });

        this.ipc.send('app-version');
    }
}
