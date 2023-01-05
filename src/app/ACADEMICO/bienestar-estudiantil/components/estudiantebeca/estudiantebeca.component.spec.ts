import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantebecaComponent } from './estudiantebeca.component';

describe('EstudiantebecaComponent', () => {
  let component: EstudiantebecaComponent;
  let fixture: ComponentFixture<EstudiantebecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantebecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantebecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
