import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipologiaComponent } from './add-tipologia.component';

describe('AddTipologiaComponent', () => {
  let component: AddTipologiaComponent;
  let fixture: ComponentFixture<AddTipologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
