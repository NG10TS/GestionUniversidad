import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagopendestComponent } from './pagopendest.component';

describe('PagopendestComponent', () => {
  let component: PagopendestComponent;
  let fixture: ComponentFixture<PagopendestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagopendestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagopendestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
