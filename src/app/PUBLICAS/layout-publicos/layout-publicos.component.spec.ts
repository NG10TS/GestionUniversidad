import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPublicosComponent } from './layout-publicos.component';

describe('LayoutPublicosComponent', () => {
  let component: LayoutPublicosComponent;
  let fixture: ComponentFixture<LayoutPublicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPublicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
