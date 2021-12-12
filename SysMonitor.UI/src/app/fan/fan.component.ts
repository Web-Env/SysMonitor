import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SparklineComponent } from "../sparkline/sparkline.component";

@Component({
    selector: 'app-fan',
    templateUrl: './fan.component.html',
    styleUrls: ['./fan.component.scss']
})
export class FanComponent implements AfterViewInit, OnInit {
    rpm: number = 0;
    animationDuration: number = 0.45;
    animationDurationStyle = `${this.animationDuration}s`;
    newAnimationDuration: number = 0;
    rampingUpAnimation: boolean = false;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        var el = document.getElementById('fan');

        el!.onanimationiteration = () => {
            if (this.newAnimationDuration != 0 && this.newAnimationDuration != this.animationDuration) {
                let durationDifference = parseFloat((this.newAnimationDuration - this.animationDuration).toFixed(1));

                if (durationDifference > 0.1 || durationDifference < -0.1) {
                    console.log (durationDifference)
                    this.animationDuration = this.newAnimationDuration;
                    this.animationDurationStyle = `${this.animationDuration}s`;
                    this.newAnimationDuration = 0;
                }

                // this.animationDuration = this.newAnimationDuration;
                // this.animationDurationStyle = `${this.animationDuration}s`;
                // this.newAnimationDuration = 0;
            }
        }
    }

    public updateFanSpeed(fanSpeed: number): void {
        this.rpm = fanSpeed;
        this.newAnimationDuration = (fanSpeed / 0.1) / 1000;
        this.sparkline.addNewPoint(fanSpeed);
    }

}
