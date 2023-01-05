import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerrequisitoComponent } from './prerrequisito.component';

describe('PrerrequisitoComponent', () => {
  let component: PrerrequisitoComponent;
  let fixture: ComponentFixture<PrerrequisitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerrequisitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerrequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
