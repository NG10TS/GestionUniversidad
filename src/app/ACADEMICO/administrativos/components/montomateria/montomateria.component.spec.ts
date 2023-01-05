import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontomateriaComponent } from './montomateria.component';

describe('MontomateriaComponent', () => {
  let component: MontomateriaComponent;
  let fixture: ComponentFixture<MontomateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontomateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontomateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
