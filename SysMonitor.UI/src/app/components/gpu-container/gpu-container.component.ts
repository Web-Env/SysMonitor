import { Component, Input, OnInit } from '@angular/core';
import { gpu } from "src/app/models/gpu.model";

@Component({
    selector: 'app-gpu-container',
    templateUrl: './gpu-container.component.html',
    styleUrls: ['./gpu-container.component.scss']
})
export class GpuContainerComponent implements OnInit {
    @Input() gpu!: gpu;

    constructor() { }

    ngOnInit(): void {
    }

}
