import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDocumentoDetalleComponent } from './registro-documento-detalle.component';

describe('RegistroDocumentoDetalleComponent', () => {
  let component: RegistroDocumentoDetalleComponent;
  let fixture: ComponentFixture<RegistroDocumentoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDocumentoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDocumentoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
