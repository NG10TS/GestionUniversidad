import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesPostgradoComponent } from './inscripciones-postgrado.component';

describe('InscripcionesPostgradoComponent', () => {
  let component: InscripcionesPostgradoComponent;
  let fixture: ComponentFixture<InscripcionesPostgradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionesPostgradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesPostgradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
