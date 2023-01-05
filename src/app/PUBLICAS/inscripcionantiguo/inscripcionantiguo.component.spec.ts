import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionantiguoComponent } from './inscripcionantiguo.component';

describe('InscripcionantiguoComponent', () => {
  let component: InscripcionantiguoComponent;
  let fixture: ComponentFixture<InscripcionantiguoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionantiguoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionantiguoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
