import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fan } from "src/app/models/fan.model";
import { SparklineComponent } from "../../shared/sparkline/sparkline.component";

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
        var testFan = new fan();
        testFan.FanType = 0;
        testFan.Rpm = 250;
        component.fan = testFan;
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
        component.updateFanSpeed();
        
        var fanElement = fixture.debugElement.nativeElement.querySelector('#fan-0');
        var fanElementAnimationDuration = fanElement.style.animationDuration;
        var sparkline = (component as any).sparkline;

        expect(component.fan.Rpm).toEqual(250);
        expect(component.animationDurationStyle).toEqual('4.8s');
        expect(fanElementAnimationDuration).toEqual('4.8s');
        expect(sparkline.points).toEqual([9.375]);
        expect(sparkline.pointsString).toEqual('0, 9.375 ');
    });
    
});
