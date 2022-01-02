import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { SparklineComponent } from '../sparkline/sparkline.component';

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
    lastTime: number = 0;
    lastDuration: number = 0;
    angle: number = 0;
    
    @ViewChild(SparklineComponent)
    private sparkline!: SparklineComponent;

    constructor() { }

    ngOnInit(): void {
        this.fanId = `fan-${this.index}`;
    }

    ngAfterViewInit(): void {
        // Need to use jQuery for this part. For some reason, despite the method apparently not doing anything, the show method call after
        // the 'animated' class is removed to make the tranisition between animation-durations smooth. Attempting to replicate the logic
        // in vanilla js from the jQuery source code does not work for some reason
        var el = $(`#${this.fanId}`);

        el.on('animationiteration', (e: JQuery.Event) => {
            if (this.newAnimationDuration != 0 && this.newAnimationDuration != this.animationDuration) {
                let durationDifference = parseFloat((this.newAnimationDuration - this.animationDuration).toFixed(1));
                
                if (durationDifference > 0.1 || durationDifference < -0.1) {
                    var currentTime = e.timeStamp / 1000;
                    var diffTime = currentTime - this.lastTime;
                    el.removeClass('animated').show();

                    this.angle += (diffTime % this.lastDuration) / this.lastDuration;

                    this.animationDuration = this.newAnimationDuration;
                    this.animationDurationStyle = `${this.animationDuration}s`;
                    this.newAnimationDuration = 0;
                    el.css('animationDuration', this.animationDurationStyle);
                    el.css('animationDelay', `${-this.animationDuration * this.angle}s`);
                    el.addClass('animated');

                    this.angle -= this.angle | 0;
                    this.lastTime = currentTime;
                    this.lastDuration = this.animationDuration;
                }
            }
        });
    }

    private updateAnimationDuration(): void {
        this.animationDuration = this.newAnimationDuration;
        this.animationDurationStyle = `${this.animationDuration}s`;
        this.newAnimationDuration = 0;
        var el = document.getElementById(this.fanId);
        el!.style.animationDuration = this.animationDurationStyle;
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
        let rps = (fanSpeed / 60);
        let timeForSingleRotation = 1 / rps;
        let animationDuration = parseFloat((timeForSingleRotation * 20).toFixed(3));

        return animationDuration;
    }
}
