import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnormalitaComponent } from './anormalita.component';

describe('AnormalitaComponent', () => {
  let component: AnormalitaComponent;
  let fixture: ComponentFixture<AnormalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnormalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnormalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
