import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer } from 'electron';
import { FanComponent } from "./fan/fan.component";
import { SparklineComponent } from "./sparkline/sparkline.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'SysMonitor';
    animationDuration: number = 0.45;
    animationDurationStyle = `${this.animationDuration}s`;
    newAnimationDuration: number = 0;
    rampingUpAnimation: boolean = false;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    @ViewChild(FanComponent)
    private fan!: FanComponent;

    private ipc!: typeof ipcRenderer;

    report = "";

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.ipc = window.require('electron').ipcRenderer;

        this.ipc.on("report", (event, data) => {
            this.report = data;
            this.changeDetectorRef.detectChanges();

            let jsonData = JSON.parse(data);
            this.fan.updateFanSpeed(parseInt(jsonData[0]["Rpm"]));
        });

        window.setInterval(() => {
            this.newAnimationDuration = this.getRandomInt(0.45, 1.7, 1);
        }, 5000);
        window.setTimeout(() => {
            this.newAnimationDuration = 0.6;
        }, 1000)
        window.setTimeout(() => {
            this.newAnimationDuration = 0.8;
        }, 1000)
        window.setTimeout(() => {
            this.newAnimationDuration = 1;
        }, 1000)
        window.setTimeout(() => {
            this.newAnimationDuration = 1.3;
        }, 1000)
        window.setTimeout(() => {
            this.newAnimationDuration = 1.6;
        }, 1000)

        
        
    }

    ngAfterViewInit() {
        console.log (this.sparkline)
    }

    getRandomInt(min: number, max: number, decimalPlaces: number): number {  
        var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
        var power = Math.pow(10, decimalPlaces);
        var randInt = Math.floor(rand*power) / power;
        return randInt;
    }
}
