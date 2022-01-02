import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
    let component: SparklineComponent;
    let fixture: ComponentFixture<SparklineComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SparklineComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SparklineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#addNewPoint should not add NaN points to the points array', () => {
        component.addNewPoint(NaN);

        expect(component.points.length).toEqual(0);
    });
    
    it('#addNewPoint should add points to the points array', () => {
        component.addNewPoint(50);

        expect(component.points.length).toEqual(1);
        expect(component.points[0]).toEqual(1.875);
    });
    
    it('#generateNewPointsString should generate pointsString when adding points to the points array', () => {
        component.points = [50];

        (component as any).generateNewPointsString();

        expect(component.pointsString).toEqual('0, 50 ');
    });

});
