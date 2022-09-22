import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestiComponent } from './add-contesti.component';

describe('AddContestiComponent', () => {
  let component: AddContestiComponent;
  let fixture: ComponentFixture<AddContestiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContestiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
