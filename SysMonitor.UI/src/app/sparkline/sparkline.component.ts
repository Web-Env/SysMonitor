import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sparkline',
    templateUrl: './sparkline.component.html',
    styleUrls: ['./sparkline.component.scss']
})
export class SparklineComponent implements OnInit {
    @Input() id!: string;

    pointsString: string = '';
    points: Array<number> = [];
    maxPoint: number = 2000;
    maxPointsLength: number = 60;
    xAxisIndexStep: number = 150 / this.maxPointsLength;

    constructor() { }

    ngOnInit(): void { }

    public addNewPoint(point: number): void {
        if (point !== undefined && !Number.isNaN(point)) {
            if (this.points.length >= this.maxPointsLength) {
                this.points.shift();
            }
    
            if (this.maxPoint === undefined || this.maxPoint < point) {
                this.maxPoint = point;
            }
            
            let scaledPoint = 75 * (point / this.maxPoint);

            this.points.push(scaledPoint);
            this.generateNewPointsString();
        }
    }

    private generateNewPointsString(): void {
        let xAxisIndex = 0;
        let newPointsString = '';

        this.points.forEach((point) => {
            newPointsString += `${xAxisIndex}, ${point} `;
            xAxisIndex += this.xAxisIndexStep;
        });

        this.pointsString = newPointsString;
    }
}
