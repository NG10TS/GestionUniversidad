import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaninsbecaComponent } from './planinsbeca.component';

describe('PlaninsbecaComponent', () => {
  let component: PlaninsbecaComponent;
  let fixture: ComponentFixture<PlaninsbecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaninsbecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaninsbecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
