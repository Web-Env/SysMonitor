import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { cpu } from "src/app/models/cpu.model";
import { SparklineComponent } from "../shared/sparkline/sparkline.component";

@Component({
    selector: 'app-cpu-container',
    templateUrl: './cpu-container.component.html',
    styleUrls: ['./cpu-container.component.scss']
})
export class CpuContainerComponent implements OnChanges, OnInit {
    @Input() cpu!: cpu;
    @Input() cpuModel!: string;

    cpuLoadString!: string;
    cpuTemperatureString!: string;
    cpuClockString!: string;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && this.sparkline !== undefined) {
            this.cpuLoadString = `${Math.round(this.cpu.Load)}%`;
            this.cpuTemperatureString = `${Math.round(this.cpu.Temperature)}°C`;
            this.cpuClockString = `${Math.round(this.cpu.Clock)}MHz`;

            this.sparkline.addNewPoint(this.cpu.Load);
        }
    }

}
