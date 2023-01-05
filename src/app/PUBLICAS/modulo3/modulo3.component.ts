import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-modulo3',
  templateUrl: './modulo3.component.html',
  styleUrls: ['./modulo3.component.css']
})
export class Modulo3Component implements OnInit {
  ruta = 'http://localhost:8000/';
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
  }
  GenerarBoleta()
  {
    const documentDefinition = {
      pageSize: 'LETTER',

      // by default we use portrait, you can change it to landscape if you wish
      // pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      // pageMargins: [ 40, 60, 40, 60 ],
      content: [
        {
          text: [
            {text: 'BOLETA DE CALIFICACIONES - GESTIÓN 2022\n', bold:true, alignment:'center'},
            {text: 'Nombre:  ', bold: true, fontSize:10},{text: 'ALEJANDRA MAMANI \n', bold: false, fontSize:10},
            {text: 'Carrera: ', bold: true, fontSize:10},{text: 'INGENIERIA EN SISTEMAS \n', bold: false, fontSize:10},
          ]
        },
        
        {
          style: 'tableExample',
          table: {
			    widths: ['*', 'auto', 'auto', 'auto','auto','auto'],
            body: [
              [
                  {text: 'Materia', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Primer Parcial', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Segundo Parcial', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Prácticas ', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Examen Final', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Nota Final', fontSize: 12, bold: true,alignment: 'center'}
              ],
              [
                  {text: 'Algebra', fontSize: 10,alignment: 'center'},    
                  {text: '75', fontSize: 10,alignment: 'center'},    
                  {text: '63', fontSize: 10,alignment: 'center'},    
                  {text: '80', fontSize: 10,alignment: 'center'},    
                  {text: '67', fontSize: 10,alignment: 'center'},
                  {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Análisis Discreto', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Ecuaciones Diferenciales', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Econometría', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Estadística', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Programación', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Física', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
              [
                {text: 'Química', fontSize: 10,alignment: 'center'},    
                {text: '75', fontSize: 10,alignment: 'center'},    
                {text: '63', fontSize: 10,alignment: 'center'},    
                {text: '80', fontSize: 10,alignment: 'center'},    
                {text: '67', fontSize: 10,alignment: 'center'},
                {text: '80', fontSize: 10,alignment: 'center'},
              ],
            ]
          }
        },
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

}
