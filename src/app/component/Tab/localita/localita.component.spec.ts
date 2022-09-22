import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalitaComponent } from './localita.component';

describe('LocalitaComponent', () => {
  let component: LocalitaComponent;
  let fixture: ComponentFixture<LocalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
