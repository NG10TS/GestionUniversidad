import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoadminsComponent } from './egresoadmins.component';

describe('EgresoadminsComponent', () => {
  let component: EgresoadminsComponent;
  let fixture: ComponentFixture<EgresoadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresoadminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
