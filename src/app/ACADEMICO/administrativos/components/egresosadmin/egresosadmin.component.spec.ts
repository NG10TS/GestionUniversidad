import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresosadminComponent } from './egresosadmin.component';

describe('EgresosadminComponent', () => {
  let component: EgresosadminComponent;
  let fixture: ComponentFixture<EgresosadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresosadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
