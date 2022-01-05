import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { SparklineComponent } from "../sparkline/sparkline.component";

import { FanComponent } from './fan.component';

describe('FanComponent', () => {
    let component: FanComponent;
    let fixture: ComponentFixture<FanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                FanComponent,
                SparklineComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FanComponent);
        component = fixture.componentInstance;
        component.index = 0;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#calculateRpmAnimationDuration should calculate the element\'s animation-duration correctly', () => {
        var animationDuration = (component as any).calculateRpmAnimationDuration(500);

        expect(animationDuration).toEqual(2.4);
    });

    it('#updateAnimationDuration should update the element\'s animation-duration property correctly', () => {
        component.newAnimationDuration = (component as any).calculateRpmAnimationDuration(500);
        (component as any).updateAnimationDuration();

        var fanElement = fixture.debugElement.nativeElement.querySelector('#fan-0');
        var fanElementAnimationDuration = fanElement.style.animationDuration;

        expect(fanElementAnimationDuration).toEqual('2.4s');
    });

    it('#updateFanSpeed should update the element and component properties correctly', () => {
        component.updateFanSpeed(500);
        
        var fanElement = fixture.debugElement.nativeElement.querySelector('#fan-0');
        var fanElementAnimationDuration = fanElement.style.animationDuration;
        var sparkline = (component as any).sparkline;

        expect(component.rpm).toEqual(500);
        expect(component.animationDurationStyle).toEqual('2.4s');
        expect(fanElementAnimationDuration).toEqual('2.4s');
        expect(sparkline.points).toEqual([18.75]);
        expect(sparkline.pointsString).toEqual('0, 18.75 ');
    });
    
});
