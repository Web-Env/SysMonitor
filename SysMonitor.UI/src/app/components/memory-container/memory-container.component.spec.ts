import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryContainerComponent } from './memory-container.component';

describe('MemoryContainerComponent', () => {
  let component: MemoryContainerComponent;
  let fixture: ComponentFixture<MemoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
