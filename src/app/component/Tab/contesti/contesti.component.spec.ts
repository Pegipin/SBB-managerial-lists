import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestiComponent } from './contesti.component';

describe('ContestiComponent', () => {
  let component: ContestiComponent;
  let fixture: ComponentFixture<ContestiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
