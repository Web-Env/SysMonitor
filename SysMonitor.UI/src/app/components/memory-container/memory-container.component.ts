import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { memory } from "src/app/models/memory.model";
import { SparklineComponent } from "../shared/sparkline/sparkline.component";

@Component({
    selector: 'app-memory-container',
    templateUrl: './memory-container.component.html',
    styleUrls: ['./memory-container.component.scss']
})
export class MemoryContainerComponent implements AfterViewInit, OnChanges, OnInit {
    @Input() memory!: memory;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    memoryUsedString!: string;
    memoryCapacityString!: string;
    memoryLoadPercentage!: number;

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.memoryCapacityString = `${this.memory.Capacity}GB`
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && this.sparkline !== undefined) {
            this.memoryUsedString = `${Math.round((this.memory.Used) * 10) / 10}GB`;
            this.memoryLoadPercentage = Math.round((this.memory.Used / this.memory.Capacity) * 100);

            this.sparkline.addNewPoint(this.memory.Used);
        }
    }

}
