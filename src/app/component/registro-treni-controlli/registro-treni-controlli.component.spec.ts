import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTreniControlliComponent } from './registro-treni-controlli.component';

describe('RegistroTreniControlliComponent', () => {
  let component: RegistroTreniControlliComponent;
  let fixture: ComponentFixture<RegistroTreniControlliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTreniControlliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTreniControlliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
