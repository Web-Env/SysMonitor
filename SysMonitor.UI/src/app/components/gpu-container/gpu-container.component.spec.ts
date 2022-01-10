import { ComponentFixture, TestBed } from '@angular/core/testing';
import { gpu } from "src/app/models/gpu.model";

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
    component.gpuModel = 'NVIDIA GeForce GTX 1080 Ti';
    var testGpu = new gpu();
    testGpu.Load = 50;
    testGpu.Temperature = 50;
    testGpu.CoreClock = 2500;
    testGpu.MemoryClock = 5000;
    testGpu.MemoryUsed = 6;
    testGpu.MemoryCapacity = 12;
    component.gpu = testGpu;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
