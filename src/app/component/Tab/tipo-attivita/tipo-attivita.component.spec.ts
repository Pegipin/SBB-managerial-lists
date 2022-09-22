import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAttivitaComponent } from './tipo-attivita.component';

describe('TipoAttivitaComponent', () => {
  let component: TipoAttivitaComponent;
  let fixture: ComponentFixture<TipoAttivitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAttivitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
