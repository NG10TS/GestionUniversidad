import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  // styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  ruta = 'http://localhost:8000/';

  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
  }

  GenerarFormulario(){
    const documentDefinition = {
      //TAMAÑO DE LA HOJA(CARTA)
      pageSize: 'LETTER',

      //ORIENTACION DE LA HOJA
      pageOrientation: 'landscape',
    
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [ 40, 60, 40, 60 ],
      // lineHeight:5,
      content:[
        

        {text:'FORMULARIO DE INSCRIPCIÓN', fontSize:15, alignment: 'center', bold:true},
        {text:'UNIVERSIDAD PRIVADA "UNIOR" \n\n', fontSize:15, alignment: 'center', bold:true},
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              
              [
                {text: [
                  // 'Inlines can be ',
                  {text:'Correo Electronico\n', fontSize:15, alignment: 'left', bold:true},
                  {text: 'abcdario@gmail.com', fontSize: 14,alignment: 'right'}]
                },
                
                {text: [
                    // 'Inlines can be ',
                    {text:'Sexo\n', fontSize:15, alignment: 'left', bold:true},
                    {text: 'MASCULINO', fontSize: 14,alignment: 'right'}]
                }
              ],
              [
                {text: [
                  // 'Inlines can be ',
                  {text:'Numero de celular del Estudiante\n', fontSize:15, alignment: 'left', bold:true},
                  {text: '12345678', fontSize: 14,alignment: 'right'}]
                },
                
                {text: [
                    // 'Inlines can be ',
                    {text:'Fecha de Nacimiento\n', fontSize:15, alignment: 'left', bold:true},
                    {text: '17/07/1998', fontSize: 14,alignment: 'right'}]
                }
              ],
              [
                {text: [
                  // 'Inlines can be ',
                  {text:'Numero de Carnet\n', fontSize:15, alignment: 'left', bold:true},
                  {text: '123456-OR', fontSize: 14,alignment: 'right'}]
                },
                
                {text: [
                    // 'Inlines can be ',
                    {text:'Edad\n', fontSize:15, alignment: 'left', bold:true},
                    {text: '23 Años', fontSize: 14,alignment: 'right'}]
                }
              ],
              
              [
                {text: [
                  // 'Inlines can be ',
                  {text:'Domicilio\n', fontSize:15, alignment: 'left', bold:true},
                  {text: 'AVENIDA ILLINIOS ESQUINO SUD Nº6', fontSize: 14}], colSpan: 2 
                }
              ],
              [
                {text: [
                  // 'Inlines can be ',
                  {text:'Correo Electronico\n', fontSize:15, alignment: 'left', bold:true},
                  {text: 'AVENIDA ILLINIOS ESQUINO SUD Nº6', fontSize: 14}], colSpan: 2 
                }
              ],
              
            ]
            
          }
          
        },
        
        {text:'\n\n\n\n\n\n\n_______________________', fontSize:15, alignment: 'center', bold:true},
        {text:'Firma del Estudiante o Padre/Tutor',fontSize:10, alignment: 'center', bold:true},
        {text:'Nºcarnet: 123456',fontSize:8, alignment: 'center', bold:true}
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
    
  }
  GenerarListaEstudiantes(){
    const documentDefinition = {
      //TAMAÑO DE LA HOJA(CARTA)
      pageSize: 'LETTER',

      //ORIENTACION DE LA HOJA
      pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      // pageMargins: [ 40, 60, 40, 60 ],
      defaultStyle : {
        fontSize  : 10,
        columnGap : 20
      },

      content:[
        // 'Texto libre',
        
        {text:'UNIVERSIDAD PRIVADA UNIOR', fontSize:10, alignment: 'center', bold:true},
        {text:'Resolucion ####', fontSize:10, alignment: 'center', bold:true},
        {text:'CARRERA: INGENIERIA', fontSize:10, alignment: 'center', bold:true},
        {text:'LISTA DE ESTUDIANTES INSCRITOS', fontSize:18, alignment: 'center', bold:true},
        {text:'GESTION: 2022\n\n\n', fontSize:15, alignment: 'center', bold:true},
        {
          style: 'tableExample',

          table: {
            headerRows: 1,

            body: [
              [
                {text: 'Nº', style: 'tableHeader'}, 
                {text: 'APELLIDOS Y NOMBRES', style: 'tableHeader'}, 
                {text: 'CÉDULA DE IDENTIDAD', style: 'tableHeader'},
                {text: 'FECHA DE NACIMIENTO', style: 'tableHeader'}, 
                {text: 'SEXO', style: 'tableHeader'},  
                {text: 'CARRERA', style: 'tableHeader'}, 
                {text: 'MATRÍCULA', style: 'tableHeader'}, 
                {text: 'CATEGORIA', style: 'tableHeader'}, 
                {text: 'FECHA DE INSCRIPCION', style: 'tableHeader'} 
              ],
              [
                '1',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING SISTEMAS',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '2',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING SISTEMAS',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '3',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING INDUSTRIAL',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '4',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING SISTEMAS',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '5',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING INFORMATICA',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '6',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING CIVIL',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ],
              [
                '7',
                'OCAÑA FLORES WILDE EDGAR',
                '4060916 -OR',
                '31/7/1982',
                'MASCULINO',
                'ING SISTEMAS',
                '001 - 0782OFW',
                'NUEVO',
                '23/1/2021'
              ]
            ]
          },
          //PARA EL BORDE EXTERIOR
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
          }
        },
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }
  GenerarSeguimientoAcademico(){
    const documentDefinition = {
      content: [
       
        {
          text: [
            {text: 'SEGUIMIENTO ACADEMICO - GESTIÓN 2022 \n\n\n', bold:true, fontsize:14, alignment:'center'},
            {text: 'Nombre:  ', bold: true, fontSize:10},{text: 'ALEJANDRA MAMANI \n', bold: false, fontSize:10},
            {text: 'Carrera: ', bold: true, fontSize:10},{text: 'INGENIERIA EN SISTEMAS \n\n\n', bold: false, fontSize:10},
          ]
        }, 
        {
          style: 'tableExample',
          table: {
			    widths: ['auto', 'auto', 'auto', '*','auto'], 
            body: [
              [
                  {text: 'Gestion-Plan ', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Sigla ', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Par ', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Descripcion de la Materia ', fontSize: 12, bold: true,alignment: 'center'},
                  {text: 'Nota ', fontSize: 12, bold: true,alignment: 'center'}
              ],
              [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'FIS 1100', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'FISICA I', fontSize: 10},    
                  {text: '80', fontSize: 10,alignment: 'center'},    
              ],
              [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 1101', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'CÁLCULO I', fontSize: 10},    
                  {text: '60', fontSize: 10,alignment: 'center'},    
              ],
              [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 1100', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ALGEBRA I', fontSize: 10},    
                  {text: '68', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'QMC 1100', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'QUÍMICA I', fontSize: 10},    
                  {text: '75', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'SIS 1101', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'PROGRAMACIÓN I', fontSize: 10},    
                  {text: '82', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 2102', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ECONOMETRÍA', fontSize: 10},    
                  {text: '65', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 2204', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ANÁLISIS NUMÉRICO', fontSize: 10},    
                  {text: '77', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 1208', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ECUACIONES DIFERENCIALES', fontSize: 10},    
                  {text: '64', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'MAT 1135', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ESTADÍSTICA', fontSize: 10},    
                  {text: '68', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'SIS 1400', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ANÁLISIS DE BALANCE', fontSize: 10},    
                  {text: '72', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'SIS 1205', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ANÁLISIS DISCRETO', fontSize: 10},    
                  {text: '84', fontSize: 10,alignment: 'center'},    
             ],
             [
                  {text: '2021-1 - G40T', fontSize: 10,alignment: 'center'},    
                  {text: 'SIS 2130', fontSize: 10,alignment: 'center'},    
                  {text: 'C', fontSize: 10,alignment: 'center'},    
                  {text: 'ESTRUCTURA DE COMPUTADORES', fontSize: 10},    
                  {text: '92', fontSize: 10,alignment: 'center'},    
          ] 
            ]
          }
        },
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }
  GenerarPlanEstudios(){
    const documentDefinition = {
      content: [
        {text: 'PLAN DE ESTUDIOS', style: 'header',alignment: 'center'
            
          
        },
        {text: ' ', style: 'header'
          },
        {
          style: 'tableExample',
          table: {
              widths: ['auto', 'auto', '*','auto', 'auto'], 
                body: [
                  [
                      {text: 'Gestion-Plan ', fontSize: 12, bold: true,alignment: 'center'},
                      {text: 'Sigla ', fontSize: 12, bold: true,alignment: 'center'},
                      {text: 'Asignatura ', fontSize: 12, bold: true,alignment: 'center'},
                      {text: 'Horas presenciales ', fontSize: 12, bold: true,alignment: 'center'},
                      {text: 'Requisitos', fontSize: 12, bold: true,alignment: 'center'},
                  ],
                  [
                      {text: '1 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ALGEBRA I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '96 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INGRESO ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '1 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1101 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'CALCULO I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '96 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INGRESO ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '1 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'FIS-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'FISICA I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INGRESO ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '1 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'QMC-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'QUIMICA I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INGRESO ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '1 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'PROGRAMACION I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '96 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INGRESO ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '2 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1103 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ALGEBRA II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '2 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1102 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'CALCULO II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1101', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '2 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'FIS-1102 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'FISICA II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'FIS-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '2 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1135 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ESTADISTICA I ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '2 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1103 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'PROGRAMACION II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1100 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '3 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'METODOS NUMERICOS ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1103 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                      [
                      {text: '3 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1207 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ECUACIONES DIFERENCIALES ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1102 ', fontSize: 12, bold: false,alignment: 'center'},
                      ], 
                       [
                      {text: '3 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1437 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ESTADISTICA II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'MAT-1135 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '3 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1200 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ESTRUCTURA DE DATOS ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1103 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '3 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'PROGRAMACION III ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1103 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '4 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-2106 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'PROGRAMACION GRAFICA ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '4 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-2220 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ESTRUCTURA DE COMPUTADORAS', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '4 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-2630 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ESTRCUTURA DE DATOS II ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1200 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '4 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INF-3200 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'ANALSIS DE BALANCE ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
                       [
                      {text: '4 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-3300 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'INVESTIGACION OPERATIVA ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: '98 ', fontSize: 12, bold: false,alignment: 'center'},
                      {text: 'SIS-1105 ', fontSize: 12, bold: false,alignment: 'center'},
                      ],
          ]
          }
        },
        ]
        
    };
    
    pdfMake.createPdf(documentDefinition).open();
  }
}
