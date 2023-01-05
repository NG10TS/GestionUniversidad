import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantediscapacitadoComponent } from './estudiantediscapacitado.component';

describe('EstudiantediscapacitadoComponent', () => {
  let component: EstudiantediscapacitadoComponent;
  let fixture: ComponentFixture<EstudiantediscapacitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantediscapacitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantediscapacitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
