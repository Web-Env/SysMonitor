import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FanComponent } from "../fan/fan.component";

@Component({
    selector: 'app-fans-container',
    templateUrl: './fans-container.component.html',
    styleUrls: ['./fans-container.component.scss']
})
export class FansContainerComponent implements AfterViewInit, OnInit {
    @Input() fans: Array<number> = [];
    @ViewChildren(FanComponent) fanComponents!: QueryList<FanComponent>;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.fanComponents.toArray();
        this.updateFanSpeeds(this.fans);
    }

    public updateFanSpeeds(fanSpeeds: Array<number>) {
        //this.fans = fanSpeeds;

        this.fanComponents.toArray().forEach((fanComponent, index) => {
            fanComponent.updateFanSpeed(fanSpeeds[index]);
        });
        this.changeDetectorRef.detectChanges();
    }
}
