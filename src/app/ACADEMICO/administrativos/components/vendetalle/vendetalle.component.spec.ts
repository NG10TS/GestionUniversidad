import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendetalleComponent } from './vendetalle.component';

describe('VendetalleComponent', () => {
  let component: VendetalleComponent;
  let fixture: ComponentFixture<VendetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
