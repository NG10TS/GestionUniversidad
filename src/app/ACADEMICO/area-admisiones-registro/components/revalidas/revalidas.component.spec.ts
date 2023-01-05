import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidasComponent } from './revalidas.component';

describe('RevalidasComponent', () => {
  let component: RevalidasComponent;
  let fixture: ComponentFixture<RevalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevalidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
