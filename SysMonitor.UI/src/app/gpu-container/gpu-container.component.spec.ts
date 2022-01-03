import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuContainerComponent } from './gpu-container.component';

describe('GpuContainerComponent', () => {
  let component: GpuContainerComponent;
  let fixture: ComponentFixture<GpuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpuContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
