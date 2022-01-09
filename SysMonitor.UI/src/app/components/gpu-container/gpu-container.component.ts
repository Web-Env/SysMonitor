import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { gpu } from "src/app/models/gpu.model";
import { GpuImageComponent } from "./gpu-image/gpu-image.component";

@Component({
    selector: 'app-gpu-container',
    templateUrl: './gpu-container.component.html',
    styleUrls: ['./gpu-container.component.scss']
})
export class GpuContainerComponent implements OnChanges, OnInit {
    @Input() gpu!: gpu;

    @ViewChild(GpuImageComponent)
    private gpuImage!: GpuImageComponent;

    fanRpm!: number;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes['gpu'].currentValue.FanRpm)
        //this.gpuImage.updateFanSpeed(changes['gpu'].currentValue.FanRpm);
    }

    public updateData(gpuData: gpu) {
        // this.gpu = gpuData;
        // this.fanRpm = this.gpu.FanRpm;
        // console.log (this.fanRpm)

        
        //this.changeDetectorRef.detectChanges();
    }

}
