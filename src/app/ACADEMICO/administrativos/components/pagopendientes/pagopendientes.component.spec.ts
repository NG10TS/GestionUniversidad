import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagopendientesComponent } from './pagopendientes.component';

describe('PagopendientesComponent', () => {
  let component: PagopendientesComponent;
  let fixture: ComponentFixture<PagopendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagopendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagopendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
