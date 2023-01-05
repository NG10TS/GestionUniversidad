import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesnuevosComponent } from './inscripcionesnuevos.component';

describe('InscripcionesnuevosComponent', () => {
  let component: InscripcionesnuevosComponent;
  let fixture: ComponentFixture<InscripcionesnuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionesnuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesnuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
