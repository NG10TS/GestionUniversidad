import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFMakerComponent } from './pdfmaker.component';

describe('PDFMakerComponent', () => {
  let component: PDFMakerComponent;
  let fixture: ComponentFixture<PDFMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDFMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
