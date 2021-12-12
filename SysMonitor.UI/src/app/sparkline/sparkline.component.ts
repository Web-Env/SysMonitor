import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sparkline',
    templateUrl: './sparkline.component.html',
    styleUrls: ['./sparkline.component.scss']
})
export class SparklineComponent implements OnInit {

    pointsString: string = "";
    points: Array<number> = [];
    maxPoint: number = 2000;
    maxPointsLength: number = 60;
    xAxisIndexStep: number = 150 / this.maxPointsLength;

    constructor() { }

    ngOnInit(): void {
        // window.setInterval(() => {
        //     this.addNewPoint(this.getRandomInt(300, 1600, 1));
        // }, 1000);
    }

    public addNewPoint(point: number): void {
        if (this.points.length >= this.maxPointsLength) {
            this.points.shift();
        }

        if (this.maxPoint === undefined || this.maxPoint < point) {
            this.maxPoint = point;
        }
        
        this.points.push(point);
        this.generateNewPointsString();
    }

    private generateNewPointsString(): void {
        var xAxisIndex = 0;
        var newPointsString = "";

        this.points.forEach((point) => {
            var scaledPoint = (point / this.maxPoint) * 75;

            newPointsString += `${xAxisIndex}, ${scaledPoint} `;
            xAxisIndex += this.xAxisIndexStep;
        });

        this.pointsString = newPointsString;
    }

    getRandomInt(min: number, max: number, decimalPlaces: number): number {  
        var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
        var power = Math.pow(10, decimalPlaces);
        var randInt = Math.floor(rand*power) / power;
        return randInt;
    }
}
