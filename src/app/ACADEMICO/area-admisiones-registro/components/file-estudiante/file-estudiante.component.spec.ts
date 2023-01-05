import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEstudianteComponent } from './file-estudiante.component';

describe('FileEstudianteComponent', () => {
  let component: FileEstudianteComponent;
  let fixture: ComponentFixture<FileEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
