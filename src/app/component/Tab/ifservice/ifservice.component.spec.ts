import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfserviceComponent } from './ifservice.component';

describe('IfserviceComponent', () => {
  let component: IfserviceComponent;
  let fixture: ComponentFixture<IfserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
