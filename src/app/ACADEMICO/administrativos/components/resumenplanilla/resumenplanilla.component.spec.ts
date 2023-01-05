import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenplanillaComponent } from './resumenplanilla.component';

describe('ResumenplanillaComponent', () => {
  let component: ResumenplanillaComponent;
  let fixture: ComponentFixture<ResumenplanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenplanillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenplanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
