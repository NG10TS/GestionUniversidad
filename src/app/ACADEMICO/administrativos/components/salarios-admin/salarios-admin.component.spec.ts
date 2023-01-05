import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariosAdminComponent } from './salarios-admin.component';

describe('SalariosAdminComponent', () => {
  let component: SalariosAdminComponent;
  let fixture: ComponentFixture<SalariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalariosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
