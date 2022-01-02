import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FansContainerComponent } from './fans-container.component';

describe('FansContainerComponent', () => {
    let component: FansContainerComponent;
    let fixture: ComponentFixture<FansContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FansContainerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FansContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
