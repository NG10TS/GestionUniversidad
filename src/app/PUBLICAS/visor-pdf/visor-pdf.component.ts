import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPDFComponent implements OnInit {
  pdfSource =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // pdfSource =  "../PARA_DESARROLLO/pdfmaker/pdfmaker.component.ts";


  constructor() { }

  ngOnInit(): void {
  }

}
