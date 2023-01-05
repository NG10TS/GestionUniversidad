import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VensemestreComponent } from './vensemestre.component';

describe('VensemestreComponent', () => {
  let component: VensemestreComponent;
  let fixture: ComponentFixture<VensemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VensemestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VensemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
