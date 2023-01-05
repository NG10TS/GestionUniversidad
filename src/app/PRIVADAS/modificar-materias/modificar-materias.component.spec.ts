import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMateriasComponent } from './modificar-materias.component';

describe('ModificarMateriasComponent', () => {
  let component: ModificarMateriasComponent;
  let fixture: ComponentFixture<ModificarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
