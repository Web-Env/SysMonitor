import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueTextComponent } from './key-value-text.component';

describe('KeyValueTextComponent', () => {
  let component: KeyValueTextComponent;
  let fixture: ComponentFixture<KeyValueTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyValueTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
