import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIfserviceComponent } from './add-ifservice.component';

describe('AddIfserviceComponent', () => {
  let component: AddIfserviceComponent;
  let fixture: ComponentFixture<AddIfserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIfserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIfserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
