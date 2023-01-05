import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadomateriaComponent } from './estadomateria.component';

describe('EstadomateriaComponent', () => {
  let component: EstadomateriaComponent;
  let fixture: ComponentFixture<EstadomateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadomateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadomateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
