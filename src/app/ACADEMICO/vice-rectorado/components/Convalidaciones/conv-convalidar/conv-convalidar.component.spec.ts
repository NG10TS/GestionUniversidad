import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvConvalidarComponent } from './conv-convalidar.component';

describe('ConvConvalidarComponent', () => {
  let component: ConvConvalidarComponent;
  let fixture: ComponentFixture<ConvConvalidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvConvalidarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvConvalidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
