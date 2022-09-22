import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvvedimentiComponent } from './add-provvedimenti.component';

describe('AddProvvedimentiComponent', () => {
  let component: AddProvvedimentiComponent;
  let fixture: ComponentFixture<AddProvvedimentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProvvedimentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProvvedimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
