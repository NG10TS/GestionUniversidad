import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteabandonoComponent } from './estudianteabandono.component';

describe('EstudianteabandonoComponent', () => {
  let component: EstudianteabandonoComponent;
  let fixture: ComponentFixture<EstudianteabandonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteabandonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteabandonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
