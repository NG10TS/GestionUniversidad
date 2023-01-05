import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCalendariosComponent } from './detalle-calendarios.component';

describe('DetalleCalendariosComponent', () => {
  let component: DetalleCalendariosComponent;
  let fixture: ComponentFixture<DetalleCalendariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCalendariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCalendariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
