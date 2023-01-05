import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeladosComponent } from './congelados.component';

describe('CongeladosComponent', () => {
  let component: CongeladosComponent;
  let fixture: ComponentFixture<CongeladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
