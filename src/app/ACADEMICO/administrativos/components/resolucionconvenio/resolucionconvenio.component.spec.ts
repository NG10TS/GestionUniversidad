import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionconvenioComponent } from './resolucionconvenio.component';

describe('ResolucionconvenioComponent', () => {
  let component: ResolucionconvenioComponent;
  let fixture: ComponentFixture<ResolucionconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolucionconvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
