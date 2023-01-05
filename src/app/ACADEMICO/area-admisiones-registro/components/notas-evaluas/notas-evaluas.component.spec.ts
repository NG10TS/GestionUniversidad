import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasEvaluasComponent } from './notas-evaluas.component';

describe('NotasEvaluasComponent', () => {
  let component: NotasEvaluasComponent;
  let fixture: ComponentFixture<NotasEvaluasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasEvaluasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasEvaluasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
