import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuImageComponent } from './gpu-image.component';

describe('GpuImageComponent', () => {
    let component: GpuImageComponent;
    let fixture: ComponentFixture<GpuImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GpuImageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GpuImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
