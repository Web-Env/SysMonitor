import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuContainerComponent } from './cpu-container.component';

describe('CpuContainerComponent', () => {
  let component: CpuContainerComponent;
  let fixture: ComponentFixture<CpuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
