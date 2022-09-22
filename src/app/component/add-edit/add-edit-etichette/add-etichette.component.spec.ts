import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtichetteComponent } from './add-etichette.component';

describe('AddEtichetteComponent', () => {
  let component: AddEtichetteComponent;
  let fixture: ComponentFixture<AddEtichetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtichetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtichetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
