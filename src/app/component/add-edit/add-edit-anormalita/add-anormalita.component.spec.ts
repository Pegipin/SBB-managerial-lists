import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnormalitaComponent } from './add-anormalita.component';

describe('AddAnormalitaComponent', () => {
  let component: AddAnormalitaComponent;
  let fixture: ComponentFixture<AddAnormalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnormalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnormalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
