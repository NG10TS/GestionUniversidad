import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaninscripcionComponent } from './planinscripcion.component';

describe('PlaninscripcionComponent', () => {
  let component: PlaninscripcionComponent;
  let fixture: ComponentFixture<PlaninscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaninscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaninscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
