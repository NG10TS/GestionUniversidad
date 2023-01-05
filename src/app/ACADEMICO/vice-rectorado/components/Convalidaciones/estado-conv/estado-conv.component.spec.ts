import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoConvComponent } from './estado-conv.component';

describe('EstadoConvComponent', () => {
  let component: EstadoConvComponent;
  let fixture: ComponentFixture<EstadoConvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoConvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
