import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { gpu } from "src/app/models/gpu.model";
import { SparklineComponent } from "../shared/sparkline/sparkline.component";

@Component({
    selector: 'app-gpu-container',
    templateUrl: './gpu-container.component.html',
    styleUrls: ['./gpu-container.component.scss']
})
export class GpuContainerComponent implements AfterViewInit, OnChanges, OnInit {
    @Input() gpu!: gpu;
    @Input() gpuModel!: string;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    gpuCoreClockString!: string;
    gpuMemoryUsedString!: string;
    gpuMemoryCapacityString!: string;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.gpuMemoryCapacityString = `${Math.round(this.gpu.MemoryCapacity / 1000)}GB`
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && this.sparkline !== undefined) {
            this.gpuCoreClockString = `${Math.round(this.gpu.CoreClock)}MHz`;
            this.gpuMemoryUsedString = `${Math.round((this.gpu.MemoryUsed / 1000) * 10) / 10}GB`;

            this.sparkline.addNewPoint(this.gpu.FanRpm);
        }
    }

}
