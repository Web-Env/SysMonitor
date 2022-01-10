import { ComponentFixture, TestBed } from '@angular/core/testing';
import { memory } from "src/app/models/memory.model";

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
    var testMemory = new memory();
    testMemory.Capacity = 32;
    testMemory.Used = 16;
    component.memory = testMemory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
