import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SparklineComponent } from "../sparkline/sparkline.component";

@Component({
    selector: 'app-fan',
    templateUrl: './fan.component.html',
    styleUrls: ['./fan.component.scss']
})
export class FanComponent implements AfterViewInit, OnInit {
    @Input() index!: number;
    fanId!: string;

    rpm: number = 0;
    animationDuration!: number;
    animationDurationStyle = `${this.animationDuration}s`;
    newAnimationDuration: number = 0;
    rampingUpAnimation: boolean = false;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.fanId = `fan-${this.index}`;
    }

    ngAfterViewInit(): void {
        var el = document.getElementById(this.fanId);
        console.log (el)

        el!.onanimationiteration = () => {
            if (this.newAnimationDuration != 0 && this.newAnimationDuration != this.animationDuration) {
                let durationDifference = parseFloat((this.newAnimationDuration - this.animationDuration).toFixed(1));

                console.log (`Duration Difference: ${durationDifference}`)
                if (durationDifference > 0.1 || durationDifference < -0.1) {
                    console.log(`New Animation Duration: ${this.newAnimationDuration}`)
                    console.log (`Duration Difference: ${durationDifference}`)
                    this.animationDuration = this.newAnimationDuration;
                    this.animationDurationStyle = `${this.animationDuration}s`;
                    this.newAnimationDuration = 0;

                    //this.changeDetectorRef.detectChanges();
                }

                // this.animationDuration = this.newAnimationDuration;
                // this.animationDurationStyle = `${this.animationDuration}s`;
                // this.newAnimationDuration = 0;
            }
            else {
                console.log ("Can't update")
            }
        }
    }

    private updateAnimationDuration(): void {
        this.animationDuration = this.newAnimationDuration;
        this.animationDurationStyle = `${this.animationDuration}s`;
        this.newAnimationDuration = 0;
    }

    public updateFanSpeed(fanSpeed: number): void {
        this.rpm = fanSpeed;
        this.newAnimationDuration = this.calculateRpmAnimationDuration(fanSpeed);
        if (this.animationDuration === undefined) {
            this.updateAnimationDuration();
        }
        
        this.sparkline.addNewPoint(fanSpeed);
    }

    private calculateRpmAnimationDuration(fanSpeed: number): number {
        let rps = (fanSpeed / 60)
        let timeForSingleRotation = 1 / rps;
        let animationDuration = parseFloat((timeForSingleRotation * 20).toFixed(3));

        return animationDuration
    }

}
