import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosIngresosComponent } from './presupuestos-ingresos.component';

describe('PresupuestosIngresosComponent', () => {
  let component: PresupuestosIngresosComponent;
  let fixture: ComponentFixture<PresupuestosIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestosIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
