import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenvencimientoComponent } from './venvencimiento.component';

describe('VenvencimientoComponent', () => {
  let component: VenvencimientoComponent;
  let fixture: ComponentFixture<VenvencimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenvencimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenvencimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
