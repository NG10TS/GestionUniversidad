import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresadotitulosComponent } from './egresadotitulos.component';

describe('EgresadotitulosComponent', () => {
  let component: EgresadotitulosComponent;
  let fixture: ComponentFixture<EgresadotitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresadotitulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresadotitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
