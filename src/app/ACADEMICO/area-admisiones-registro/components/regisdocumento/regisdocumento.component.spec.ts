import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisdocumentoComponent } from './regisdocumento.component';

describe('RegisdocumentoComponent', () => {
  let component: RegisdocumentoComponent;
  let fixture: ComponentFixture<RegisdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisdocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
