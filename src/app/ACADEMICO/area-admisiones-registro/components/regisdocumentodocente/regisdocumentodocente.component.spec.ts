import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisdocumentodocenteComponent } from './regisdocumentodocente.component';

describe('RegisdocumentodocenteComponent', () => {
  let component: RegisdocumentodocenteComponent;
  let fixture: ComponentFixture<RegisdocumentodocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisdocumentodocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisdocumentodocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
