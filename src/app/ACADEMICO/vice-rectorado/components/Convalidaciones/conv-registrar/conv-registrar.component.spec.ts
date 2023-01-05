import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvRegistrarComponent } from './conv-registrar.component';

describe('ConvRegistrarComponent', () => {
  let component: ConvRegistrarComponent;
  let fixture: ComponentFixture<ConvRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
