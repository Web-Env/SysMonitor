import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer } from 'electron';

import { FansContainerComponent } from './components/fans-container/fans-container.component';
import { GpuContainerComponent } from "./components/gpu-container/gpu-container.component";

import { cpu } from "./models/cpu.model";
import { memory } from "./models/memory.model";
import { gpu } from "./models/gpu.model";
import { fan } from "./models/fan.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'SysMonitor';

    appVersion!: string;

    cpu!: cpu;
    memory!: memory;
    gpu!: gpu;
    fans!: Array<fan>;

    cpuModel!: string;
    gpuModel!: string;

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

            this.cpu = jsonData.Cpu;
            this.cpuModel = jsonData.CpuModel;

            this.memory = jsonData.Memory;
            
            var gpuData = jsonData.Gpu;
            this.gpuModel = jsonData.GpuModel;
            if (this.gpu === undefined) {
                this.gpu = gpuData;
            }
            else {
                this.gpu = gpuData;
            }
            
            var fanData = jsonData.Fans;
            if (this.fans === undefined) {
                this.fans = fanData;
            }
            else {
               this.fans.forEach((fan, index) => {
                   this.fans[index].Rpm = fanData[index].Rpm;
               });
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
