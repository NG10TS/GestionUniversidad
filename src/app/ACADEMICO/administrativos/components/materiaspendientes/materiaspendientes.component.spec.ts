import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaspendientesComponent } from './materiaspendientes.component';

describe('MateriaspendientesComponent', () => {
  let component: MateriaspendientesComponent;
  let fixture: ComponentFixture<MateriaspendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaspendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaspendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
