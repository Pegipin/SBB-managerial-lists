import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocalitaComponent } from './add-localita.component';

describe('AddLocalitaComponent', () => {
  let component: AddLocalitaComponent;
  let fixture: ComponentFixture<AddLocalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
