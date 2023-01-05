import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvContenidosComponent } from './conv-contenidos.component';

describe('ConvContenidosComponent', () => {
  let component: ConvContenidosComponent;
  let fixture: ComponentFixture<ConvContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvContenidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
