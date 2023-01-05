import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasRegistradasComponent } from './materias-registradas.component';

describe('MateriasRegistradasComponent', () => {
  let component: MateriasRegistradasComponent;
  let fixture: ComponentFixture<MateriasRegistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriasRegistradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
