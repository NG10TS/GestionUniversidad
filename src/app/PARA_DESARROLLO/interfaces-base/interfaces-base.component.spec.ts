import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesBaseComponent } from './interfaces-base.component';

describe('InterfacesBaseComponent', () => {
  let component: InterfacesBaseComponent;
  let fixture: ComponentFixture<InterfacesBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacesBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
