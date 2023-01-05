import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteseguiminetoComponent } from './docenteseguimineto.component';

describe('DocenteseguiminetoComponent', () => {
  let component: DocenteseguiminetoComponent;
  let fixture: ComponentFixture<DocenteseguiminetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteseguiminetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteseguiminetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
