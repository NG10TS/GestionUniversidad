import { Component, Inject, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { ApisService } from 'src/app/core/services/Apis.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { NotasEvaluasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/NotasEvaluas.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { EgresadosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/Egresados.service';
import { GestionesService } from 'src/app/core/services/ACADEMICO/administrativos/gestiones.service';
import { EstudiantesRegularesService } from 'src/app/core/services/ACADEMICO/administrativos/estudiantes-regulares.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdfmaker',
  templateUrl: './pdfmaker.component.html',
  styleUrls: ['./pdfmaker.component.css']
})
export class PDFMakerComponent implements OnInit {
  @Inject(DOCUMENT) document
  someSvg = '<svg width="300" height="200" viewBox="0 0 300 200">' +
    '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' +
    '</svg>';

  public var = 2

  xd : HTMLElement;
  public classEval = {


    "style-1": this.var = 10,
    "style-2": this.var < 10
  }
  data: SafeHtml;
  logoDataUrl: string;


  constructor(private sanitizer: DomSanitizer,protected _est:EstudiantesService,
    protected _doc:DocentesService, protected _notas:NotasEvaluasService, protected _mat:MateriasService, protected _carr:CarrerasService,
    protected _AsigEst:AsignacionEstudiantesService, protected _egre:EgresadosService,
    protected _gest:GestionesService, protected _estreg:EstudiantesRegularesService,
    protected _sql:ApisService) { }

  ngOnInit(): void {

    this.data = this.sanitizer.bypassSecurityTrustHtml(this.someSvg);

    // Utils.getImageDataUrlFromLocalPath1('assets/0.png').then(
    //   result => this.logoDataUrl = result
    // )
    //Utils.getImageDataUrlFromLocalPath('assets/0.png').subscribe(
    //  result => this.logoDataUrl = result
    //)

    this.CargarEstudiante();
    this.CargarAsignacionEstudiantes();
    this.CargarMateria();
    this.CargarCarrera();
    this.CargarNotasEvaluas();
    this.CargarEgresados();
    this.CargarDocentes();

  }
  dataest=[]
  CargarEstudiante(){
    this._est.ObtenerEstudiantes()
    .then(res=>{
      this.dataest=res.data;
    })
  }
  // estreg=[]
  // CargarEstudianteRegular(){
  //   this._estreg.ObtenerEstudiantesRegulares()
  //   .then(res=>{
  //     this.estreg=res.data;
  //   })
  // }
  doc=[]
  CargarDocentes() {
    this._doc.ObtenerDocentes()
      .then(res => {
        console.log(res.data);
        this.doc = res.data;
      }).catch(err => {
        console.log("err");
      });
  }

  nota=[]
  CargarNotasEvaluas(){
    this._notas.ObtenerNotasEvaluas()
    .then(res => {
      console.log("cargado NotasEvaluas",res.data);
      this.nota = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
  }
  AEst=[]
  CargarAsignacionEstudiantes(){
    this._AsigEst.ObtenerAsignacionEstudiantes()
    .then(res => {
      console.log(res.data);
      this.AEst = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  carre=[]
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  mat=[]
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  egre=[]
  CargarEgresados(){
    this._egre.ObtenerEgresados()
    .then(res => {
      console.log(res.data);
      this.egre = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }

  openListaEstudiante2(){
    var datos;
    this._sql.ConsultaSQL("select * from tb_estudiantes")
    .then(res=>{
      datos=res.data
      console.log("ESTOS SON LOS DATOS", datos)



      var headers = {
        fila_0:{
          col_0:{text:'Nº'},
          col_1:{text:'NOMBRE COMPLETO'},
          col_2:{text:'CARNET'},
        },
        fila_1:{
          col_0:{text:'Nº'},
          col_1:{text:'NOMBRE COMPLETO'},
          col_2:{text:'CARNET'},
        },
      }
      var body=[]
      for(var key in headers){
        if (headers.hasOwnProperty(key)) {
          var header = headers[key]
          var row = new Array();
          row.push(header.col_0);
          row.push(header.col_1);
          row.push(header.col_2);
          body.push(row);
        }
      }
      var rows = datos;
      console.log("CONJUNTO DE DATOS ES", rows)

      var contador = 0;
      for(var key in rows){
        if (rows.hasOwnProperty(key)) {
          var data = rows[key]
          var row = new Array();
          contador= contador+1;
          row.push(contador); //0
          row.push({ text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
          row.push({ text: data.ci_est.toString()}); //2
          body.push(row);
        }
      }
      var dd = {

        pageMargins: [ 20, 10, 10 ,10],
        pageOrientation: 'landscape',
        pageSize: 'A4',
      content: [
          {
            style: 'tableExample',
            color: '#444',
            table: {
              widths: ['auto',270, 50],
              headerRows:2,
              // keepWithHeaderRows: 1,
              body: body
            }
          },
        ],

      }
      pdfMake.createPdf(dd).open();
    })




  }
  openListaEstudiante(){
    var NombreCompleto = 'ZAPATA RODRIGUEZ GABRIELA MARGARITA'
    var headers = {
      fila_0:{
        col_0:{text:'Nº'},
        col_1:{text:'NOMBRE COMPLETO'},
        col_2:{text:'CARNET'},
        // col_3:{text:'CODIGO'},
      },
      // fila_1:{
      //   col_0:{text:'Nº'},
      //   col_1:{text:'NOMBRE COMPLETO'},
      //   col_2:{text:'CARNET'},
      //   col_3:{text:'CODIGO'},
      // }
    }
    var body=[]
    for(var key in headers){
      if (headers.hasOwnProperty(key)) {
        var header = headers[key]
        var row = new Array();
        row.push(header.col_0);
        row.push(header.col_1);
        row.push(header.col_2);
        // row.push(header.col_3);
        body.push(row);
      }
    }
    var rows = this.dataest;
    console.log("CONJUNTO DE DATOS EST", rows)

    var contador = 0;
    for(var key in rows){
      if (rows.hasOwnProperty(key)) {
        var data = rows[key]
        var row = new Array();
        contador= contador+1;
        row.push(contador); //0
        row.push({ text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
        row.push({ text: data.ci_est.toString()}); //2
        // row.push({ text: data.cod_est.toString()}); //3
        body.push(row);
      }
    }





    var dd = {

      pageMargins: [ 20, 10, 10 ,10],
      pageOrientation: 'landscape',
      pageSize: 'A4',
    content: [
     { text:'Universidad Privada de Oruro',alignment: 'right',bold: true,},
      {

        style: 'tableExample',
        table: {
            widths: [200,200, 100],
          body: [

            [
              {

                border: [false,false,false, false],
                text: 'Asignacion de Materias\n1/2,022',
                style: 'header',
                  bold: true,
                  fontSize: 16,

              },'',''
            ],
          ['','',''
              ],

          ]
        },
        layout: {
          defaultBorder: false,
        }

      },

      {

        style: 'tableExample',
        table: {
            widths: ['auto',80, 'auto',80,70,70,70,90],
          body: [

            [
              {text:'CODIGO:',border: [,false ,false ,false ,false]},
              {
                border: [true,true ,true ,true],
                text: '4578'
              },'','','',
              {text: 'MATRICULA:',border: [false,false,false ,false]},
              {text:'CPA0411',border: [true ,true ,true ,true ]},''

            ],
            [
              {text:'NOMBRE:',border: [false,false,false ,false]},
                        {
                border: [true ,true,true ,true],
                text: NombreCompleto,
                colSpan: 4

              },
              '','','',{text:'Carrera:',	alignment: ''},
              {
                border: [true ,true,true ,true],
                text: 'INGENIERIA DE SISTEMAS (R)',
                colSpan: 2,
              },''

            ],

          ]
        },
        layout: {
          defaultBorder: false,
        }
        },
        '\n\n',
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto',270, 50],
          headerRows:1,
          // keepWithHeaderRows: 1,
          body: body
        }
      },
    '\n','\n','\n','\n','\n','\n',
      {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [20,270, 50,'auto', 280,2],
            // keepWithHeaderRows: 1,
            body: [

              [{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]}, {text: 'Admisiones y Registros', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]},{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]},{text: 'SALVATIERRA DAMIAN HENRY WILLIAM', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]},{text: '', styleA: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]}],
      ]
          }
        },

        {text: '\n', style: 'header',decoration: 'underline' },
      ],
      Style: {
        // alignment: 'justify'
      }

    }
    pdfMake.createPdf(dd).open();
  }









  ngOnChanges(){

  }

  openAsignacionMaterias(){
    var dd = {

      pageMargins: [ 20, 10, 10 ,10],
      pageOrientation: 'landscape',
      pageSize: 'A4',
    content: [
     { text:'Universidad Privada de Oruro',alignment: 'right',bold: true,},
      {

        style: 'tableExample',
        table: {
            widths: [200,200, 100],
          body: [

            [
              {

                border: [false,false,false, false],
                text: 'Asignacion de Materias\n1/2,022',
                style: 'header',
                  bold: true,
                  fontSize: 16,

              },'',''
            ],
          ['','',''
              ],

          ]
        },
        layout: {
          defaultBorder: false,
        }

      },
      {

        style: 'tableExample',
        table: {
            widths: ['auto',80, 'auto',80,70,70,70,90],
          body: [

            [
              {text:'CODIGO:',border: [,false ,false ,false ,false]},
              {
                border: [true,true ,true ,true],
                text: '4578'
              },'','','',
              {text: 'MATRICULA:',border: [false,false,false ,false]},
              {text:'CPA0411',border: [true ,true ,true ,true ]},''

            ],
            [
              {text:'NOMBRE:',border: [false,false,false ,false]},
                        {
                border: [true ,true,true ,true],
                text: 'ZAPATA RODRIGUEZ GABRIELA MARGARITA',
                colSpan: 4

              },
              '','','',{text:'Carrera:',	alignment: ''},
              {
                border: [true ,true,true ,true],
                text: 'INGENIERIA DE SISTEMAS (R)',
                colSpan: 2,
              },''

            ],

          ]
        },
        layout: {
          defaultBorder: false,
        }
        },
        '\n\n',
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto',270, 50,'auto', 'auto',250],
          // keepWithHeaderRows: 1,
          body: [

            [{text: 'ASIG', style: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,true ,true]}, {text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true,	border: [true ,false,true ,true]}, {text: 'SEM', style: 'tableHeader', alignment: 'center',bold: true,	border: [true ,false,true ,true]},{text: 'TURNO', style: 'tableHeader', alignment: 'center',bold: true,	border: [true ,false,true ,true]},{text: 'PAR', style: 'tableHeader', alignment: 'center',bold: true,	border: [true ,false,true ,true]},{text: 'DOCENTE', styleA: 'tableHeader', alignment: 'center',bold: true,	border: [true ,false,false,true]}],
            [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,false ,false]}, {text: 'CBA-120 CONTABILIDAD BASICA', style: 'tableHeader',border: [true,false,false ,false]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,false ,false]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'ALISABEL DURAN GARCIA', styleA: 'tableHeader',bold: true,border: [true,false,false ,false]}],
                [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,false ,false]}, {text: 'ECD-120 ECUACIONES DIFERENCIALES', style: 'tableHeader',border: [true,false,false ,false]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,false ,false]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'ENRIQUE CADIMA VICENTE', styleA: 'tableHeader',bold: true,border: [true,false,false ,false]}],
                [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,false ,false]}, {text: 'ELM-120 ELECTRICIDAD Y MAGNTISMO', style: 'tableHeader',border: [true,false,false ,false]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,false ,false]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'ANDREA CARLA INIGUEZ YUGAR', styleA: 'tableHeader',bold: true,border: [true,false,false ,false]}],
                [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,false ,false]}, {text: 'EST-120 ESTADISTICA I', style: 'tableHeader',border: [true,false,false ,false]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,false ,false]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'HERBER LUIS FLORES LIQUE', styleA: 'tableHeader',bold: true,border: [true,false,false ,false]}],
                [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,false ,false]}, {text: 'INF-120 ESTRUCTURA DE DATOS', style: 'tableHeader',border: [true,false,false ,false]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,false ,false]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,false ,false]},{text: 'ERICKA TATIANA LUZ BURGOA', styleA: 'tableHeader',bold: true,border: [true,false,false ,false]}],
                [{text: '21-ene-22', style: 'tableHeader', alignment: 'center',border: [false,false,true ,true]}, {text: 'QUE-120 QUECHUA', style: 'tableHeader',border: [true,false,true ,true]}, {text: '3', style: 'tableHeader', alignment: 'center',border: [true,false,true ,true]},{text: 'TARDE', style: 'tableHeader',alignment: 'center',border: [true,false,true ,true]},{text: 'A', style: 'tableHeader', alignment: 'center',border: [true,false,true ,true]},{text: 'LUCIANO PEREZ APAZA', styleA: 'tableHeader',bold: true,border: [true,false,false ,true]}],
    ]
        }
      },
    '\n','\n','\n','\n','\n','\n',
      {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [20,270, 50,'auto', 280,2],
            // keepWithHeaderRows: 1,
            body: [

              [{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]}, {text: 'Admisiones y Registros', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]},{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]},{text: 'SALVATIERRA DAMIAN HENRY WILLIAM', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]},{text: '', styleA: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]}],
      ]
          }
        },

        {text: '\n', style: 'header',decoration: 'underline' },
      ],
      Style: {
        // alignment: 'justify'
      }

    }
    pdfMake.createPdf(dd).open();
  }

  openBoletadeCalificaciones(){
    const dd = {
      pageMargins: [ 40, 20, 20 ,40],
            pageOrientation: 'landscape',
            pageSize: 'LETTER',
          content: [
          { text:'Universidad Privada de Oruro',alignment: 'right'},
            {

              style: 'tableExample',
              table: {
                  widths: [160,200, 100, 140],
                body: [

                  [
                    {

                      border: [true,true ,true , true],
                      text: 'BOLETA DE CALIFICACION',
                      style: 'header',
                        bold: true

                    },'','',''
                  ],
                ['','','',''
                    ],

                ]
              },
              layout: {
                defaultBorder: false,
              }

            },
            {

              style: 'tableExample',
              table: {
                  widths: ['auto',80, 'auto',80,70,40,10],
                body: [

                  [
                    {text:'CODIGO:',border: [true,true ,false ,false]},
                    {
                      border: [false,true ,false ,false],
                      text: '4578'
                    },
                    {text: 'MATRICULA:',border: [false,true ,false ,false]},
                    {text:'CPA0411',border: [false,true ,true ,false]},{
                      border: [false,false ,false , false],
                    text: 'GESTION:',},
                    '2/2022','',
                  ],
                  [
                    {text:'NOMBRE:',border: [true,false,false ,false]},
                              {
                      border: [false,false ,true , false],
                      text: 'ZAPATA RODRIGUEZ GABRIELA MARGARITA',
                      colSpan: 3

                    },
                    '',{text:'',	alignment: ''},{
                      border: [false,false ,false , false],
                      text: ''
                    },'',''

                  ],

                  [
                      {text:'CARRERA:',border: [true,false ,false ,true]},
                              {

                      border: [false,false ,false  ,true],
                      text: 'AUDITORIA®'
                    },
                    {text:'',	alignment: 'right', colSpan: 2,border: [false,false ,true ,true]},'',{
                      border: [false,false ,false , false],
                      text: ''
                    },'',''

                  ],
                ]
              },
              layout: {
                defaultBorder: false,
              }
              },
              '\n\n',
            {
              style: 'tableExample',
              color: '#444',
              table: {
                widths: ['auto',270, 50,'auto', 'auto','auto','auto','auto'],
                // keepWithHeaderRows: 1,
                body: [

                  [{text: 'COD', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'parcial 1', style: 'tableHeader', alignment: 'center',bold: true},{text: 'parcial 2', style: 'tableHeader', alignment: 'center',bold: true},{text: 'e. final', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Revalida', styleA: 'tableHeader', alignment: 'center',bold: true},{text: 'N. FINAL', styleA: 'tableHeader', alignment: 'center',bold: true},{text: 'Nota Literal', style: 'tableHeader', alignment: 'center',bold: true}],
                  [{text: 'AIE-150', style: 'tableHeader', alignment: 'center'}, {text: 'ANALISIS E INTERPRETACION DE ESTADOS FIN', style: 'tableHeader'}, {text: '18', style: 'tableHeader', alignment: 'center'},{text: '24', style: 'tableHeader',alignment: 'center'},{text: '18', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '60', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Sesenta', style: 'tableHeader', alignment: 'center',bold: true}],
                  [{text: 'IGAC-150', style: 'tableHeader', alignment: 'center'}, {text: 'GABINETE CONTABLE', style: 'tableHeader'}, {text: '21', style: 'tableHeader', alignment: 'center'},{text: '21', style: 'tableHeader', alignment: 'center'},{text: '19', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '61', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Sesenta y Uno', style: 'tableHeader', alignment: 'center',bold: true}],
                      [{text: 'IFO-150', style: 'tableHeader', alignment: 'center'}, {text: 'IMPUESTOS Y FRANQUICIAS EN OPERACIONES D', style: 'tableHeader'}, {text: '16', style: 'tableHeader', alignment: 'center'},{text: '26', style: 'tableHeader', alignment: 'center'},{text: '28', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '70', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Setenta', style: 'tableHeader', alignment: 'center',bold: true}],
                            [{text: 'LTA-150', style: 'tableHeader', alignment: 'center'}, {text: 'LEGISLACION TRIBUTARIA ADUANERA', style: 'tableHeader'}, {text: '21', style: 'tableHeader', alignment: 'center'},{text: '20', style: 'tableHeader', alignment: 'center'},{text: '20', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '61', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Sesenta y uno', style: 'tableHeader', alignment: 'center',bold: true}],
                    [{text: 'PRE-150', style: 'tableHeader', alignment: 'center'}, {text: 'PRESUPUESTOS', style: 'tableHeader'}, {text: '31', style: 'tableHeader', alignment: 'center'},{text: '33', style: 'tableHeader', alignment: 'center'},{text: '25', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '89', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Ochenta y nueve', style: 'tableHeader', alignment: 'center',bold: true}],
                  [{text: 'PRP-150', style: 'tableHeader', alignment: 'center'}, {text: 'PREPARACION DE PROYECTO', style: 'tableHeader'}, {text: '31', style: 'tableHeader', alignment: 'center'},{text: '33', style: 'tableHeader', alignment: 'center'},{text: '25', style: 'tableHeader', alignment: 'center'},{text: '0', styleA: 'tableHeader', alignment: 'center',bold: true},{text: '89', style: 'tableHeader', alignment: 'center',bold: true},{text: 'Ochenta y nueve', style: 'tableHeader', alignment: 'center',bold: true}],
          ]
			}
		},



		  {text: '\n', style: 'header',decoration: 'underline' },
      ],
      Style: {
        // alignment: 'justify'
      }


    }
    pdfMake.createPdf(dd).open();
  }
  openCertificadoCalificaciones(){
    var dd = {

      pageMargins: [ 40, 170, 10, 14 ],
    content: [


      {
      },
      {

        style: 'tableExample',
        table: {
            widths: [80,200, 100, 140],
          body: [

            [
              'NOMBRE:',{
                  colSpan: 2,
                border: [false,false ,false , true],
                text: 'AGUILAR APAZA OMAR ANTIOCO'
              },'',
              '',

            ],
          ['','','',''
              ],

          ]
        },
        layout: {
          defaultBorder: false,
        }

      },
      {

        style: 'tableExample',
        table: {
            widths: [80,80, 90,130,90,10,10],
          body: [

            [
              'MATRICLULA:',
              {
                border: [false,false ,false ,true],
                text: 'DER0070'
              },
              '',
              {text:'CEDULA DE INDETIDAD:',	alignment: 'right'},{
                border: [false,false ,false , true],
                text: '3073944'
              },'','',

            ],
            [
              'CARRERA:',
                        {
                border: [false,false ,false , true],
                text: 'DERECHO'
              },
              '',{text:'GRADO ACADEMICO:',	alignment: 'right'},{
                border: [false,false ,false , true],
                text: 'LICENCIATURA:'
              },'',''

            ],

            [
              'GESTION:',
                        {

                border: [false,false ,false  , true],
                text: '2003'
              },
              {text:'N DE SERIE DE HISTORIAL ACADEMICO:',	alignment: 'right', colSpan: 2},'',{
                border: [false,false ,false , true],
                text: '4927'
              },'',''

            ],
          ]
        },
        layout: {
          defaultBorder: false,
        }
        },
        '\n\n',
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto',200, 50, 100, 'auto'],
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [

            [{text: 'COD', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true},{text: 'LITERAR', style: 'tableHeader', alignment: 'center',bold: true},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true}],
            [{text: 'DER-104', style: 'tableHeader', alignment: 'center'}, {text: 'DERECHO DE LA SEGURIDAD SOCIAL', style: 'tableHeader'}, {text: '77', style: 'tableHeader', alignment: 'center'},{text: 'setenta y siete', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'}],
            [{text: 'DER-105', style: 'tableHeader', alignment: 'center'}, {text: 'CIENCIA POLITICA', style: 'tableHeader'}, {text: '52', style: 'tableHeader', alignment: 'center'},{text: 'Cincuenta y dos', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'}],
                [{text: 'DER-106', style: 'tableHeader', alignment: 'center'}, {text: 'DERECHO MINERO Y DE HIDROCARBUROS', style: 'tableHeader'}, {text: '86', style: 'tableHeader', alignment: 'center'},{text: 'ochenta y seis', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'}],
                      [{text: 'DER-320', style: 'tableHeader', alignment: 'center'}, {text: 'DERECHO CIVIL II(OBLIGACIONES)', style: 'tableHeader'}, {text: '93', style: 'tableHeader', alignment: 'center'},{text: 'noventa y tres', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'}],
              [{text: 'DER-500', style: 'tableHeader', alignment: 'center'}, {text: 'DERECHO ADMINISTRATIVO Y CIENCIA ADMINISTRATIVA', style: 'tableHeader'}, {text: '55', style: 'tableHeader', alignment: 'center'},{text: 'Cincuenta y cinco', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'}],

    ]
        }
      },



      {text: '\n', style: 'header',decoration: 'underline' },
    ],
    Style: {
      // alignment: 'justify'
    }

  }
  pdfMake.createPdf(dd).open();
  }
  openCertificadoDesignacionDoc(){
//CDoc
    var rows = this.doc;
    console.log("CONJUNTO DE DATOS DOC", rows)
    var rows1 = this.carre;
    console.log("CONJUNTO DE DATOS DOC", rows1)

    this._sql.ConsultaSQL("select * from tb_docentes")
    var contador = 0;
    for(var key in rows){
      if (rows.hasOwnProperty(key)) {
        var doc_1 = rows[key]
      }
    }
    for(var key in rows1){
      if (rows1.hasOwnProperty(key)) {
        var doc_2 = rows1[key]
      }
    }




    var dd = {
      content: [
        {
          text: 'Universidad Privada de Oruro',
          style: 'header',

        },
        {
          text: [
                 {text: '!Orgullo orureño!\n\n\n\n',style:'bigger'},

            {text: '', fontSize: 11, italics: true},
            {text: 	'\nCERTIFICADO 138/2018\n',fontSize: 16,bold: true,alignment: 'center',decoration: 'underline' },
            {text: '\n\n\nLA   SUSCRITA   VICERRRECTORA\nACADEMICA DE LA UNIVERSIDAD\nPRIVADA DE ORURO. A SOLICITUD\nESCRITA DE LA INTERESADA.\n',fontSize: 12,italics: true,alignment: 'right',bold: true},
            '\n'
          ]
        },
        // data.ape_m_est.toString()
        {text: '\nCERTIFICA QUE:',fontSize: 12,bold: true},
        // {text: 	'\n\nLa Inge SAAVEDRA QUINTEROS CARMEN ROSA con numero de C.I. 3093955 Or., es docente titular de la carrera de INGENIERIA DE SISTEMAS de la Universidad en las asignaturas de :\n\n',fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	'\n\nA' ,fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: doc_1.grado.toString()+' '+doc_1.nombre_doc.toString()+' '+doc_1.ape_p_doc.toString()+' '+doc_1.ape_m_doc.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	'con numero de C.I. ',fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	doc_1.ci.toString()+' '+doc_1.expedido.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	', es docente titular de la carrera de ',fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	' '+doc_2.nombre_carre.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
        {text: 	' de la Universidad en las asignaturas de :\n\n',fontSize: 14,italics: true,alignment: 'justify',bold: true},

        // {text: 	'\n'+' '+ doc_1.nombre_doc.toString()+' ' + doc_1.ape_p_doc.toString() +' ' +doc_1.ape_m_doc.toString() +'\n',fontSize: 24,bold: true,alignment: 'center'},

        {
          style: 'tableExample',
          table: {
            widths: [50, '*', 100, '*',200],
            body: [
              [ {text: 'AÑO',	alignment: 'center' ,bold: true},{text: 'GESTION',	alignment: 'center' ,bold: true},{text: 'CARRERA',	alignment: 'center' ,bold: true},{text: 'SEMESTRE',	alignment: 'center' ,bold: true},{text: 'MATERIA',	alignment: 'center' ,bold: true}],
              [{text: '\n\n2018',	alignment: 'center',rowSpan: 4 }, {text: '\n\n1',	alignment: 'center',rowSpan: 4}, {text: '\n\nINGENIERIA DE SISTEMAS',	alignment: 'center',rowSpan: 4}, {text: '5to',alignment: 'center'}, {text: 'DISEÑO DE PAGINAS WEB I',	alignment: 'center'}],
              [{},{},{},{text: '6to',alignment: 'center'},{text: 'INVESTIGACION OPERATIVA II',alignment: 'center'}],
              [{},{},{},{text: '6to',alignment: 'center'},{text: 'LENGUAJES DE PROGRAMACION',	alignment: 'center'}],
              [{},{},{},{text: '10mo',alignment: 'center'},{text: 'ADMINISTRACION DE SISTEMAS DE INFORMACION',alignment: 'center'}]

            ]
          }
        },

        {
          text: [
            {text: '\n\n Es cuando certifico en honor a la verdad para fines que convengan a la solicitante.',fontSize: 11,bold: true},
                {text: ' \n', fontSize: 10,alignment: 'center',bold: true} ,
            {text: '\n\nOruro, 24 de marzo de 2022.',style: 'bigger'},
            {text: '\n\n\n\n\n\n\n',},
            {text: '\n\n\n\n\n\n\nEDIFICIO CENTRAL: calle junin Nº 348 esquina potosi - Telefonos: 5273780 - 5273781 - Fax: 5280745', fontSize: 10,alignment: 'center',bold: true},
            {text: '\nSEGUNDO EDIFICIO: calle ayacucho Nº 550 entre 6 de Octubre y Soria Galvarro - Telefonos: 5284586', fontSize: 10,alignment: 'center',bold: true},
    ]
        }
      ],
      styles: {
        header: {
            fonts: 'curier',
          fontSize: 24,
          bold: true,
          alignment: 'right',


        },
        bigger: {
           fonts: 'curier',
          fontSize: 14,
          italics: true,
          alignment: 'right',

        }
      }

    }
    pdfMake.createPdf(dd).open();
  }
  openCertificadoEgreso(){

    var rows = this.dataest;
    console.log("CONJUNTO DE DATOS EST", rows)
    var rows1 = this.carre;
    console.log("CONJUNTO DE DATOS EST", rows1)
    var rows2 = this.egre;
    console.log("CONJUNTO DE DATOS EST", rows2)
    // this._sql.ConsultaSQL("select * from tb_egr_titulados WHERE id_titulado=5 ")

    var contador = 0;
    for(var key in rows){
      if (rows.hasOwnProperty(key)) {
        var data = rows[key]
        // var row = new Array();
        // contador= contador+1;
        // row.push(contador); //0
        // row.push({ text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
        // row.push({ text: data.ci_est.toString()}); //2
        // row.push({ text: data.cod_est.toString()}); //3
        // body.push(row);
      }
    }
    for(var key in rows1){
      if (rows1.hasOwnProperty(key)) {
        var car = rows1[key]

      }
    }
    for(var key in rows2){
      if (rows2.hasOwnProperty(key)) {
        var egr = rows2[key]
        var egr1= rows[key]
        var egr2= rows1[key]
      }
    }


    var dd = {
      content: [
        {
          text: 'Nº 314\n\n\n',
          style: 'header',

        },
        {

          text: [
                 {text: '095/99\n\n',style:'bigger'},

            {text: 'Al señor (a):\n ', fontSize: 11, italics: true},
            // {text: 	'\nKIEFFER FLORES PLINIO OSMAR\n',fontSize: 24,bold: true,alignment: 'center'},
            // {text: 	'\n'+ data.ape_p_est.toString()+' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString() +'\n',fontSize: 24,bold: true,alignment: 'center'},
            {text: 	'\n',fontSize: 24,bold: true,alignment: 'center'},
            {text: 	'\n'+' '+ egr1.nombre_est.toString()+' ' + egr1.ape_p_est.toString() +' ' +egr1.ape_m_est.toString() +'\n',fontSize: 24,bold: true,alignment: 'center'},

//EGRESADO123
            {text: '\nNatural del Departamento de Oruro, quien ha concluido satisfactoriamente sus estudios académicos el año 2021 en la carrera de:',fontSize: 10,italics: true,alignment: 'justify'},
            '\n'
          ]
        },
        // {text: '\nMEDICINA',fontSize: 30,bold: true,alignment: 'center'},
        {text: '\n'+egr2.nombre_carre.toString(),fontSize: 30,bold: true,alignment: 'center'},
        {
          text: [

            {text: 	'\n\nEn merito a ello y mientras apruebe la modalidad de graduación, se le otorga el presente documento para cumplir los requisitos de trámite de Diploma Académico.\n\n',fontSize: 10,italics: true,alignment: 'justify'},
            {text: '\nOruro, 06 de Abril del 2022               ',style: 'bigger'},
            {text: '\n\n\n\n\n\n\n      DIRECTOR DE CARRERA              ', fontSize: 11,alignment: 'center',decoration:'overline'},
              {text: '                      ',italics: true, fontSize: 11 },
            {text: '       VICERECTOR ACADEMICO          ', fontSize: 11,alignment: 'center',decoration:'overline'},
            {text: ' \nUNIVERSIDAD PRIVADA DE ORURO                      UNIVERSIDAD PRIVADA DE ORURO      ', fontSize: 11,alignment: 'center'},
               {text: ' \nDr. Oscar Fernando Cruz Echeverria                                 Lic. Nancy Lidia Cortés Mar nez       ', fontSize: 10,alignment: 'center',bold: true} ,
            {text: '\n\n\n\n\n\n\n\n\n\n',},
            {text: '\n                       RECTOR                      ', fontSize: 11,alignment: 'center',decoration:'overline' },
            {text: '\nUNIVERSIDAD PRIVADA DE ORURO                       ',  fontSize: 11,alignment: 'center'},
            {text: '\nMgr. Abog. María Beatriz Cortés Gumucio                                                                              ', fontSize: 10,alignment: 'right',bold: true},
      {text: '\n',  fontSize: 11,alignment: 'center'}
          ]
        }
      ],
      styles: {
        header: {
            fonts: 'curier',
          fontSize: 28,
          bold: true,
          alignment: 'right',


        },
        bigger: {
           fonts: 'curier',
          fontSize: 14,
          bold: true,
          alignment: 'right',
        }
      }

    }
    pdfMake.createPdf(dd).open();
  }

  openCertificadoEstRegular(){
    var rows = this.dataest;
    console.log("CONJUNTO DE DATOS EST", rows)
    var rows1 = this.carre;
    console.log("CONJUNTO DE DATOS EST", rows1)
    this._sql.ConsultaSQL("select * from tb_estudiantes WHERE id_est=12 ")
    var contador = 0;
    for(var key in rows){
      if (rows.hasOwnProperty(key)) {
        var data = rows[key]
        // var row = new Array();
        // contador= contador+1;
        // row.push(contador); //0
        // row.push({ text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
        // row.push({ text: data.ci_est.toString()}); //2
        // row.push({ text: data.cod_est.toString()}); //3
        // body.push(row);
      }
    }
    for(var key in rows1){
      if (rows1.hasOwnProperty(key)) {
        var car = rows1[key]
        // var row = new Array();
        // contador= contador+1;
        // row.push(contador); //0
        // row.push({ text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
        // row.push({ text: data.ci_est.toString()}); //2
        // row.push({ text: data.cod_est.toString()}); //3
        // body.push(row);
      }
    }
    var dd = {

      content: [
        {
          text: 'Universidad Privada de Oruro',
          style: 'header',

        },

        {
          text: [
                 {text: '!Orgullo orureño!\n\n\n\n',style:'bigger'},

            {text: '', fontSize: 11, italics: true},
            {text: 	'\nCERTIFICADO 067/2022\n',fontSize: 16,bold: true,alignment: 'center',decoration: 'underline' },
            {text: '\n\n\n LA   SUSCRITA   VICERRRECTORA\nACADEMICA DE LA UNIVERSIDAD\nPRIVADA DE ORURO. A SOLICITUD\nVERVAL DEL INTERESADO.\n',fontSize: 12,italics: true,alignment: 'right',bold: true},
            '\n'
          ]
        },
        {text: '\nCERTIFICA:',fontSize: 12,bold: true},
        {
          text: [
// EstRegular
            {text: 	'\n\nQue el Universitario ' ,fontSize: 14,italics: true,alignment: 'justify',bold: true},
            // {text: 'BEJAR IBEROS FRANZ LUIS' },
            {text: data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: ' con numero de C.I. ' ,fontSize: 14,italics: true,alignment: 'justify',bold: true},
            // {text: '4498780' },
            {text: data.ci_est.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true },
            {text: ' expedido en la cuidad de ',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            // {text: 'Cochabamba'},
            {text: data.exp_est.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: ', numero de matricula ',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: 'ADM 1355',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: ', es estudiante regular de la carrera de ',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            // {text: 'Administracion de Empresas',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: car.nombre_carre.toString(),fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: ', de Nuestra Casa Superior de Estudios.\n\n',fontSize: 14,italics: true,alignment: 'justify',bold: true},
            {text: '\nEl Plan de Estudios de la carrera exige cumplir 9 semestres, el estudiante esta cursando el 5to semestre de en la Universidad,(Inicio de clases el 24 de enero y finalizar el 25 de junio de 2022).',fontSize: 11,alignment: 'justify',bold: true},
            {text: '\n\n Es cuando certifico para fines consiguientes del interesado.',fontSize: 11,bold: true},
                {text: ' \n', fontSize: 10,alignment: 'center',bold: true} ,
            {text: '\n\nOruro, 24 de marzo de 2022.',style: 'bigger'},
            // {text: ,style: 'bigger'},

            {text: '\n\n\n\n\n\n\n\n\n',},

            {text: '\nVICERRECTORA ACADEMICA',  fontSize: 11,alignment: 'center'},
            {text: '\n\n\n\n\n\n\n\n\nEDIFICIO CENTRAL: calle junin Nº 348 esquina potosi - Telefonos: 5273780 - 5273781 - Fax: 5280745', fontSize: 10,alignment: 'center',bold: true},
            {text: '\nSEGUNDO EDIFICIO: calle ayacucho Nº 550 entre 6 de Octubre y Soria Galvarro - Telefonos: 5284586', fontSize: 10,alignment: 'center',bold: true},

          ]
        }
      ],
      styles: {
        header: {
            fonts: 'curier',
          fontSize: 24,
          bold: true,
          alignment: 'right',


        },
        bigger: {
           fonts: 'curier',
          fontSize: 14,
          italics: true,
          alignment: 'right',

        }
      }

    }
    pdfMake.createPdf(dd).open();
  }


  openControlNotas(){
    var dd = {

      pageMargins: [ 16, 10, 16 ,16],
    content: [

      {

        style: 'tableExample',
        table: {
            widths: [270,30, 200],
          body: [

            [{ text:'Universidad Privada de Oruro\n Orgullo Orureño!!!',alignment: 'right',bold: true,},'',
              {

                border: [true,true,true, true],
                text: 'Control de notas',
                style: 'header',
                  fontSize: 26,
                  alignment: 'center',

              }
            ],
          ['','',''
              ],

          ]
        },
        layout: {
          defaultBorder: false,
        }

      },
      {

        style: 'tableExample',
        table: {
            widths: [20,70,20,80,110,61,20,70],
          body: [
              [
              {text:'',border: [false,false,false ,false]},
                        {
                border:[false,false,false ,false],
                text: '',
                colSpan: 4

              },
              '','','',{text:'DIrecion de',	alignment: ''},
              {
                border: [true ,true,true ,true],
                text: 'Admisiones y registro',fontSize: 10,
                colSpan: 2,
              },''

            ],

          ]

        },
        layout: {
          defaultBorder: false,
        }
        },

          '\n',
          {

        style: 'tableExample',
        table: {
            widths: [50,10,40,100,50,50,150,9],
          body: [
              [
              {text:'Carrera',border: [false,false,false ,false],fontSize: 10},
                        {
                border: [true ,true,true ,true],
                text: 'DERECHO',fontSize: 10,
                colSpan: 3

              },
              '','',{
                border:  [false,false,false ,false],
                text: '',

              },
              {text:'Docente',	fontSize: 10},
              {
                border: [true ,true,true ,true],
                text: 'DR. OSCAR ENSINAS MONTAÑO',fontSize: 10

              },''

            ],

          ]

        },
        layout: {
          defaultBorder: false,
        }
        },
        '',
        {

        style: 'tableExample',
        table: {
            widths: [50,10,40,100,50,50,150,9],
          body: [
              [
              {text:'Semenstre',border: [false,false,false ,false],fontSize: 10},
                        {
                border: [true ,true,true ,true],
                text: 'CUARTO AÑO',fontSize: 10,
                colSpan: 3

              },
              '','',{
                border:  [false,false,false ,false],
                text: '',

              },
              {text:'Materia',	fontSize: 10},
              {
                border: [true ,true,true ,true],
                text: 'DERECHO CIVIL IV. SUCESIONES',fontSize: 10

              },''

            ],

          ]

        },
        layout: {
          defaultBorder: false,
        }
        },

      {
        style: 'tableExample',
        table: {
            widths: [50,10,40,100,50,50,150,9],
          body: [
              [
              {text:'Paralelo',border: [false,false,false ,false],fontSize: 10},
                        {
                border: [true ,true,true ,true],
                text: 'A',fontSize: 10,
                colSpan: 3

              },
              '','',{
                border:  [false,false,false ,false],
                text: '',

              },
              {text:'Turno:',	fontSize: 10},
              {
                border: [true ,true,true ,true],
                text: 'NOCHE',fontSize: 10

              },''

            ],

          ]

        },
        layout: {
          defaultBorder: false,
        }
  },'\n',
      {

        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto',260, 60,60, 70,30],
          keepWithHeaderRows: 1,
          body: [

           [{text: 'Nº', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'NOMINA DE ESTUDIANTES', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'NOTA PRIMER PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'NOTA SEGUNDO PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'NOTA EXAMEN FINAL 30%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'TOTAL 100%', styleA: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                [{text: '1', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '2', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '3', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '4', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '5', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '6', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '7', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '8', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '9', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '10', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '11', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '12', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '13', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '14', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '15', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '17', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '19', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '20', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '21', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '22', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '23', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '24', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '25', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '26', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '27', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '28', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '29', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
                  [{text: '30', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}]


      ]
        }
      },

    {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [520,200, 50],
          // keepWithHeaderRows: 1,
          body: [
            [{text: '', style: 'tableHeader', alignment: 'center',bold: true,colSpan: 3,border: [false,false, false,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}],

    ]
        }
      },

      {text: '\n', style: 'header',decoration: 'overline'},
    {text: '', style: 'header'}
    ],
    Style: {
      // alignment: 'justify'
    }

  }
  pdfMake.createPdf(dd).open();
  }

//
//

openControlNotas2(){
  var NombreCompleto = 'ZAPATA RODRIGUEZ GABRIELA MARGARITA'
  var headers={
    fila_0:
    {
    // col_0:{text: 'Nº'},
    // col_1:{text: 'NOMINA DE ESTUDIANTES'},
    // col_2:{text: 'NOTA PRIMER PARCIAL 35%'},
    // col_3:{text: 'NOTA SEGUNDO PARCIAL 35%'},
    // col_4:{text: 'NOTA EXAMEN FINAL 30%'},
    // col_5:{text: 'TOTAL 100%'},

    col_0:{text: 'Nº', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    col_1:{text: 'NOMINA DE ESTUDIANTES', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    col_2:{text: 'NOTA PRIMER PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    col_3:{text: 'NOTA SEGUNDO PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    col_4:{text: 'NOTA EXAMEN FINAL 30%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    col_5:{text: 'TOTAL 100%', styleA: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},
    },

    }
    var body=[]
    for(var key in headers){
      if (headers.hasOwnProperty(key)) {
        var header = headers[key]
        var row = new Array();
        row.push(header.col_0); //0
        row.push(header.col_1); //1
        row.push(header.col_2); //2
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        body.push(row);
      }
    }
    var rows = this.nota;
    console.log("CONJUNTO DE DATOS EST", rows)

    var contador = 0;
    for(var key in rows){
      if (rows.hasOwnProperty(key)) {
        var data = rows[key]
        var row = new Array();
        contador= contador+1;
        row.push(contador); //0
        row.push({ text: (data.ape_p_est.toString()==null)?'':data.ape_p_est.toString() +' '+ data.ape_m_est.toString()+' ' + data.nombre_est.toString()}); //1
        row.push({ text: data.eval_p1.toString()}); //2
        row.push({ text: data.eval_p2.toString()}); //3
        row.push({ text: data.eval_fin.toString()}); //4
        row.push({ text: data.nota_final.toString()}); //5
        body.push(row);
      }
    }

//   var dd = {

//     pageMargins: [ 16, 10, 16 ,16],
//   content: [

//     {

//       style: 'tableExample',
//       table: {
//           widths: [270,30, 200],
//         body: [

//           [{ text:'Universidad Privada de Oruro\n Orgullo Orureño!!!',alignment: 'right',bold: true,},'',
//             {

//               border: [true,true,true, true],
//               text: 'Control de notas',
//               style: 'header',
//                 fontSize: 26,
//                 alignment: 'center',

//             }
//           ],
//         ['','',''
//             ],

//         ]
//       },
//       layout: {
//         defaultBorder: false,
//       }

//     },
//     {

//       style: 'tableExample',
//       table: {
//           widths: [20,70,20,80,110,61,20,70],
//         body: [
//             [
//             {text:'',border: [false,false,false ,false]},
//                       {
//               border:[false,false,false ,false],
//               text: '',
//               colSpan: 4

//             },
//             '','','',{text:'DIrecion de',	alignment: ''},
//             {
//               border: [true ,true,true ,true],
//               text: 'Admisiones y registro',fontSize: 10,
//               colSpan: 2,
//             },''

//           ],

//         ]

//       },
//       layout: {
//         defaultBorder: false,
//       }
//       },

//         '\n',
//         {

//       style: 'tableExample',
//       table: {
//           widths: [50,10,40,100,50,50,150,9],
//         body: [
//             [
//             {text:'Carrera',border: [false,false,false ,false],fontSize: 10},
//                       {
//               border: [true ,true,true ,true],
//               text: 'DERECHO',fontSize: 10,
//               colSpan: 3

//             },
//             '','',{
//               border:  [false,false,false ,false],
//               text: '',

//             },
//             {text:'Docente',	fontSize: 10},
//             {
//               border: [true ,true,true ,true],
//               text: 'DR. OSCAR ENSINAS MONTAÑO',fontSize: 10

//             },''

//           ],

//         ]

//       },
//       layout: {
//         defaultBorder: false,
//       }
//       },
//       '',
//       {

//       style: 'tableExample',
//       table: {
//           widths: [50,10,40,100,50,50,150,9],
//         body: [
//             [
//             {text:'Semenstre',border: [false,false,false ,false],fontSize: 10},
//                       {
//               border: [true ,true,true ,true],
//               text: 'CUARTO AÑO',fontSize: 10,
//               colSpan: 3

//             },
//             '','',{
//               border:  [false,false,false ,false],
//               text: '',

//             },
//             {text:'Materia',	fontSize: 10},
//             {
//               border: [true ,true,true ,true],
//               text: 'DERECHO CIVIL IV. SUCESIONES',fontSize: 10

//             },''

//           ],

//         ]

//       },
//       layout: {
//         defaultBorder: false,
//       }
//       },

//     {
//       style: 'tableExample',
//       table: {
//           widths: [50,10,40,100,50,50,150,9],
//         body: [
//             [
//             {text:'Paralelo',border: [false,false,false ,false],fontSize: 10},
//                       {
//               border: [true ,true,true ,true],
//               text: 'A',fontSize: 10,
//               colSpan: 3

//             },
//             '','',{
//               border:  [false,false,false ,false],
//               text: '',

//             },
//             {text:'Turno:',	fontSize: 10},
//             {
//               border: [true ,true,true ,true],
//               text: 'NOCHE',fontSize: 10

//             },''

//           ],

//         ]

//       },
//       layout: {
//         defaultBorder: false,
//       }
// },'\n',
//     {
//       style: 'tableExample',
//       color: '#444',
//       table: {
//         widths: ['auto',260, 60,60, 70,30],
//         // keepWithHeaderRows: 1,
//         body: [

//          [{text: 'Nº', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'NOMINA DE ESTUDIANTES', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'NOTA PRIMER PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'NOTA SEGUNDO PARCIAL 35%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'NOTA EXAMEN FINAL 30%', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'TOTAL 100%', styleA: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
//               [{text: '1', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '2', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '3', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '4', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '5', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '6', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '7', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '8', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '9', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '10', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '11', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '12', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '13', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '14', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '15', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '17', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '19', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '20', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '21', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '22', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '23', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '24', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '25', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '26', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '27', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '28', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '29', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}],
//                 [{text: '30', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ADRIAN CHOQUE RUBEN', style: 'tableHeader',fontSize: 10}, {text: '18', style: 'tableHeader', alignment: 'center',fontSize: 10},{text:'20', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '16', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: '54', styleA: 'tableHeader', alignment: 'center',fontSize: 10}]







//     ]
//       }
//     },

//   {
//       style: 'tableExample',
//       color: '#444',
//       table: {
//         widths: [520,200, 50],
//         // keepWithHeaderRows: 1,
//         body: [
//           [{text: '', style: 'tableHeader', alignment: 'center',bold: true,colSpan: 3,border: [false,false, false,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}],

//   ]
//       }
//     },

//     {text: '\n', style: 'header',decoration: 'overline'},
//   {text: '', style: 'header'}
//   ],
//   Style: {
//     // alignment: 'justify'
//   }
//////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////
var dd = {

  pageMargins: [ 20, 10, 10 ,10],
  pageOrientation: 'landscape',
  pageSize: 'A4',
content: [
 { text:'Universidad Privada de Oruro',alignment: 'right',bold: true,},
  {

    style: 'tableExample',
    table: {
        widths: [200,200, 100,100,100,100],
      body: [

        [
          {

            border: [false,false,false, false],
            text: 'Control de Notas\n1/2022',
            style: 'header',
              bold: true,
              fontSize: 16,

          },'',''
        ],
      ['','',''
          ],

      ]

    },
    layout: {
      defaultBorder: false,
    }

  },

  {

    style: 'tableExample',
    table: {
        widths: ['auto',80, 'auto',80,70,70,70,90],
      body: [

        [
          {text:'CODIGO:',border: [,false ,false ,false ,false]},
          {
            border: [true,true ,true ,true],
            text: '4578'
          },'','','',
          {text: 'MATRICULA:',border: [false,false,false ,false]},
          {text:'CPA0411',border: [true ,true ,true ,true ]},''

        ],
        [
          {text:'NOMBRE:',border: [false,false,false ,false]},
                    {
            border: [true ,true,true ,true],
            text: NombreCompleto,
            colSpan: 4

          },
          '','','',{text:'Carrera:',	alignment: ''},
          {
            border: [true ,true,true ,true],
            text: 'INGENIERIA DE SISTEMAS (R)',
            colSpan: 2,
          },''

        ],

      ]
    },
    layout: {
      defaultBorder: false,
    }
    },
    '\n\n',
  {
    style: 'tableExample',
    color: '#444',
    table: {
      widths: ['auto',270, 50,50,50,50],
      headerRows:1,
      // keepWithHeaderRows: 1,
      body: body
    }
  },
'\n','\n','\n','\n','\n','\n',
  {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [20,270, 50,'auto', 280,2],
        // keepWithHeaderRows: 1,
        body: [

          [{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]}, {text: 'Admisiones y Registros', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]},{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]},{text: 'SALVATIERRA DAMIAN HENRY WILLIAM', style: 'tableHeader', alignment: 'center',bold: true,border: [false,true,false ,false]},{text: '', styleA: 'tableHeader', alignment: 'center',bold: true,	border: [false,false,false,false]}],
  ]
      }
    },

    {text: '\n', style: 'header',decoration: 'underline' },
  ],
  Style: {
    // alignment: 'justify'
  }



}
pdfMake.createPdf(dd).open();
}

//
//

  openDesignacionDoc(){
    var dd = {
      pageOrientation: 'landscape',
    content: [
        {
        alignment: 'justify',
        columns: [
        {text: 'Universidad Privada de oruro', style: 'header', decoration: 'underline'},	,
          {
            text: 'GESTION II/2019'
          }
        ]
      },


      {text: 'DESIGNACION DE DOCENTES', style: 'header',alignment: 'center'},

      {
      style: 'tableExample',

        color: '#444',
        table: {
          widths: [20, 15,17, 17,38,200,200,25,60,60],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: [
            [{text: 'CAR', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'NIV',fontSize: 9,style: 'tableHeader'}, {text:'TUR',fontSize: 9,style: 'tableHeader'},{text:'PAR',fontSize: 9,style: 'tableHeader'},{text:'SIGLA',fontSize: 9,style: 'tableHeader'},{text:'MATERIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'DOCENTE',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'TIPO',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'INICIO',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'FIN',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ADM-101',fontSize: 9,style: 'tableHeader'},{text:'DIRECCION DE EMPRESAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'CNA-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS CULINARIAS I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HCA-101',fontSize: 9,style: 'tableHeader'},{text:'HIGIENE Y CONSERVACION DE ALIMENTOS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'MET-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS DE APRENDIZAJE',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'PAN-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS DE PANADERIA Y PASTELERIA ',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'TUR-101',fontSize: 9,style: 'tableHeader'},{text:'GESTION TURISTICA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ADM-101',fontSize: 9,style: 'tableHeader'},{text:'DIRECCION DE EMPRESAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'CNA-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICA CULINARIA I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HCA-101',fontSize: 9,style: 'tableHeader'},{text:'HIGIENE Y CONSERVACION DE ALIMENTOS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'MET-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS DE APRENDIZAJE',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'PAN-101',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS DE PANADERIA Y PASTELERIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'1',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'TUR-101',fontSize: 9,style: 'tableHeader'},{text:'GESTION TURISTICA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ARP-201',fontSize: 9,style: 'tableHeader'},{text:'ATENCION AL CLIENTE Y RELACIONES PUBLICAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'CNA-202',fontSize: 9,style: 'tableHeader'},{text:'TECNICAS CULINARIAS II',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HIS-201',fontSize: 9,style: 'tableHeader'},{text:'HISTORIA DE BOLIVIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HOT-201',fontSize: 9,style: 'tableHeader'},{text:'RECEPCION HOTELERA Y RESERVAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ING-201',fontSize: 9,style: 'tableHeader'},{text:'INGLES I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'2',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'PAN-202',fontSize: 9,style: 'tableHeader'},{text:'PANADERIA NACIONAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'AYB-301',fontSize: 9,style: 'tableHeader'},{text:'ALIMENTOS Y BEBIDAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'CNA-303',fontSize: 9,style: 'tableHeader'},{text:'COCINA NACIONAL I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HIS-302',fontSize: 9,style: 'tableHeader'},{text:'HISTORIA UNIVERSAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ING-302',fontSize: 9,style: 'tableHeader'},{text:'INGLES II',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'PAN-303',fontSize: 9,style: 'tableHeader'},{text:'PANADERIA INTERNACIONAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'TUR-302',fontSize: 9,style: 'tableHeader'},{text:'ARQUEOLOGIA Y MUSEOLOGIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'AYB-301',fontSize: 9,style: 'tableHeader'},{text:'ALIMENTOS Y BEBIDAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'CNA-303',fontSize: 9,style: 'tableHeader'},{text:'COCINA NACIONAL I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'HIS-302',fontSize: 9,style: 'tableHeader'},{text:'HISTORIA UNIVERSAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'ING-302',fontSize: 9,style: 'tableHeader'},{text:'INGLES II',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'PAN-303',fontSize: 9,style: 'tableHeader'},{text:'PANADERIA INTERNACIONAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'N',fontSize: 9,style: 'tableHeader'},{text:'A',fontSize: 9,style: 'tableHeader'},{text:'TUR-302',fontSize: 9,style: 'tableHeader'},{text:'ARQUEOLOGIA Y MUSEOLOGIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'AYB-301',fontSize: 9,style: 'tableHeader'},{text:'ALIMENTOS Y BEBIDAS',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'CNA-303',fontSize: 9,style: 'tableHeader'},{text:'COCINA NACIONAL I',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'HIS-302',fontSize: 9,style: 'tableHeader'},{text:'HISTORIA UNIVERSAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'ING-302',fontSize: 9,style: 'tableHeader'},{text:'INGLES II',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'PAN-303',fontSize: 9,style: 'tableHeader'},{text:'PANADERIA INTERNACIONAL',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
        [{text: 'GHT', style: 'tableHeader',  fontSize: 9,alignment: 'left'},{text:'3',fontSize: 9,style: 'tableHeader'}, {text:'M',fontSize: 9,style: 'tableHeader'},{text:'B',fontSize: 9,style: 'tableHeader'},{text:'TUR-302',fontSize: 9,style: 'tableHeader'},{text:'ARQUEOLOGIA Y MUSEOLOGIA',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'<PENDIENTE>',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'R',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'02-MAR-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'},{text:'12-JUL-2020',fontSize: 9,style: 'tableHeader',alignment: 'center'}],
          ]

        }
      }

    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    }

  }
  pdfMake.createPdf(dd).open();
  }
  openDiplomaAcademico(){
    var dd = {
      pageSize: 'legal',
    content: [
      {
        text: '\n\n\n',
        style: 'header',

      },
      {
        text: [
              {text: '\n\n\n\n\n',style:'bigger'},

          {text: '\n ', fontSize: 11, italics: true},
          {text: 	'\nMgs. Abg. MARIA BEATRIZ CORTES GUMUCIOR\n',fontSize: 16,bold: true,alignment: 'center'},
          {text: '\n\n\nPor cuanto:',fontSize: 14,italics: true,alignment: 'justify',bold: true},
          '\n'
        ]
      },
      {text: '\nPLINIO OSMAR KIEFFER FLORES',fontSize: 20,bold: true,alignment: 'center',italics: true},
      {
        text: [

          {text: 	'\n\nNatural de Oruro (Provincia Pantaleon Dalence – Localidad Huanuni), ha cumplido con todos los requisitos previstos por Ley y Reglamentos Universitarios Vigentes.\n\n',fontSize: 14,italics: true,alignment: 'justify',bold: true},
          {text: '\nPor Tanto: En uso de sus facultades específicas, le confiere el DIPLOMA ACADÉMICO de:',fontSize: 14,italics: true,alignment: 'justify',bold: true},
          {text: '\n\n\n    MÉDICO CIRUJANO',fontSize: 14,bold: true,alignment: 'center'},
              {text: ' \n', fontSize: 10,alignment: 'center',bold: true} ,
            {text: '\n\nEs dado en la ciudad de Oruro a los veintidós días del mes de abril del año dos mil veintidós.',style: 'bigger'},
          {text: '\n\n\n\n\n\n\n\n\n',},

          {text: '\nUNIVERSIDAD PRIVADA DE ORURO                       ',  fontSize: 11,alignment: 'right'},
          {text: '\nMgr. Abog. María Beatriz Cortés Gumucio                     ', fontSize: 10,alignment: 'right',bold: true},
    {text: '\n',  fontSize: 11,alignment: 'right'}
        ]
      }
    ],
    styles: {
      header: {
          fonts: 'curier',
        fontSize: 28,
        bold: true,
        alignment: 'right',


      },
      bigger: {
        fonts: 'curier',
        fontSize: 14,
        bold: true,
        italics: true,

      }
    }

  }
pdfMake.createPdf(dd).open();
}

//
//
//



//
//
//




openEstadoMateria(){
  var dd = {
    pageOrientation: 'landscape',
    pageMargins: [ 40, 10, 10, 14 ],
	content: [

		{text: 'UNIVERSIDAD PRIVADA DE ORURO ', style: 'header',decoration: 'underline' },

		{
			style: 'tableExample',
			table: {
				body: [
					[''],

				]

			}
		},
		{

			style: 'tableExample',
			table: {
			    widths: [100,50, 100, 140],
				body: [

					[
						'','','',
						{
							border: [true, true, true, true],
							text: 'ESTADO DE MATERIAS'
						},

					],
				['','','',''
				    ],

				]
			},
			layout: {
				defaultBorder: false,
			}

		},
		{

			style: 'tableExample',
			table: {
			    widths: [50,50, 100,140,50,60,150],
				body: [

					[
						'codigo:',
						{
							border: [true, true, true, true],
							text: '5724'
						},
						'MATRICULA:',
						{
							border: [true, true, true, true],
							text: 'SIS0756'
						},'','CARRERA',
						{
							border: [true, true, true, true],
							text: 'INGENIERIA DE SISTEMAS'
						},
					],
					[
						'Nombre:',
                    	{
                    	    colSpan: 6,
							border: [true, true, true, true],
							text: 'CAREAGA VEIZAGA DANIEL JESUS'
						},
						'','','','',''

					],

					['','','','','','','']
				]
			},
			layout: {
				defaultBorder: false,
			}

		},
		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: ['auto',300, 80, 50, 'auto','auto','auto','auto','auto','auto'],

				// keepWithHeaderRows: 1,
				body: [

					[{text: 'CODIGO', style: 'tableHeader', alignment: 'center',bold: true},{text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'REQUISITOS', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'CNV', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'APR', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'REP', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'HAB', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'PEN', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2}],
                	[{text: 'PRIMERO', style: 'tableHeader', colSpan: 2}, {},{},{},{},{},{},{},{},{}],
                	[{text: 'ADM-100', style: 'tableHeader', alignment: 'center'}, {text: 'ADMINISTRACION I', style: 'tableHeader'}, {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '77', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
                	[{text: 'ALF-100', style: 'tableHeader', alignment: 'center'}, {text: 'ALGEBRA Y LOGICA FORMAL', style: 'tableHeader'},  {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '52', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
		        	[{text: 'CAL-100', style: 'tableHeader', alignment: 'center'}, {text: 'CALCULO I', style: 'tableHeader'},  {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '86', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
                    [{text: 'INF-100', style: 'tableHeader', alignment: 'center'}, {text: 'INFORMATICA I', style: 'tableHeader'},  {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '93', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
			    	[{text: 'ISO-100', style: 'tableHeader', alignment: 'center'}, {text: 'INGENIERIA DE SISTEMAS EN LAS ORGANIZACIONES', style: 'tableHeader'}, {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '55', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
			    	[{text: 'ING-100', style: 'tableHeader', alignment: 'center'}, {text: 'INGLES', style: 'tableHeader'}, {text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '77', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado 2/2021', style: 'tableHeader', alignment: 'center'},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{},{},{}],
		            [{text: 'CODIGO', style: 'tableHeader', alignment: 'center',bold: true},{text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'REQUISITOS', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'CNV', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'APR', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'REP', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'HAB', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'PEN', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2}],
		        	[{text: 'SEGUNDO', style: 'tableHeader', colSpan: 2}, {},{},{},{},{},{},{},{},{}],
		        	[{text: 'ALL-110', style: 'tableHeader', alignment: 'center'}, {text: 'ALGEBRA LINEAL', style: 'tableHeader'}, {text: 'ALF-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ARC-110', style: 'tableHeader', alignment: 'center'}, {text: 'ARQUITECTURA COMPUTACIONAL', style: 'tableHeader'}, {text: 'ALF-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'CAL-110', style: 'tableHeader', alignment: 'center'}, {text: 'CALCULO II', style: 'tableHeader'}, {text: 'CAL-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'INF-110', style: 'tableHeader', alignment: 'center'}, {text: 'INFORMATICA II', style: 'tableHeader'},{text: 'INF-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ING-110', style: 'tableHeader', alignment: 'center'}, {text: 'INGLES', style: 'tableHeader'}, {text: 'ING-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'MEC-110', style: 'tableHeader', alignment: 'center'}, {text: 'MECANICA CLASICA', style: 'tableHeader'},{text: 'CALL-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
                    [{text: 'CODIGO', style: 'tableHeader', alignment: 'center',bold: true},{text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'REQUISITOS', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'CNV', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'APR', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'REP', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'HAB', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'PEN', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2}],
                    [{text: 'TERCERO', style: 'tableHeader', colSpan: 2}, {},{},{},{},{},{},{},{},{}],
		        	[{text: 'CBA-120', style: 'tableHeader', alignment: 'center'}, {text: 'CONTABILIDAD BASICA', style: 'tableHeader'}, {text: 'ADM-100', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ECD-120', style: 'tableHeader', alignment: 'center'}, {text: 'ECUACIONES DIFERENCIALES', style: 'tableHeader'}, {text: 'MEC-110', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ELM-120', style: 'tableHeader', alignment: 'center'}, {text: 'ELECTRICIDAD Y MAGNETISMO', style: 'tableHeader'}, {text: 'MEC-110', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'EST-120', style: 'tableHeader', alignment: 'center'}, {text: 'ESTADISTICA II', style: 'tableHeader'},{text: 'ALL-110', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'INF-120', style: 'tableHeader', alignment: 'center'}, {text: 'ESTRCUTURA DE DATOS', style: 'tableHeader'}, {text: 'INF-110', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'QUE-120', style: 'tableHeader', alignment: 'center'}, {text: 'QUECHUA', style: 'tableHeader'},{text: 'NINGUNO', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
                    [{}, {},{},{},{},{},{},{},{},{}],
                    [{text: 'CODIGO', style: 'tableHeader', alignment: 'center',bold: true},{text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'REQUISITOS', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'CNV', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'APR', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'REP', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'HAB', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2},{text: 'PEN', style: 'tableHeader', alignment: 'center',bold: true,rowSpan: 2}],
                    [{text: 'CUARTO', style: 'tableHeader', colSpan: 2}, {},{},{},{},{},{},{},{},{}],
		        	[{text: 'BDD-110', style: 'tableHeader', alignment: 'center'}, {text: 'BASE DE DATOS', style: 'tableHeader'}, {text: 'ECD-120/INF-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'CEL-110', style: 'tableHeader', alignment: 'center'}, {text: 'CIRCUITOS ELECTRONICOS', style: 'tableHeader'}, {text: 'ELM-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ETS-110', style: 'tableHeader', alignment: 'center'}, {text: 'ESTADISTICA II', style: 'tableHeader'}, {text: 'EST-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'INS-110', style: 'tableHeader', alignment: 'center'}, {text: 'INGENIERIA DE SISTEMAS I', style: 'tableHeader'},{text: 'INF-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'INF-110', style: 'tableHeader', alignment: 'center'}, {text: 'LENGUAJE DE PROGRAMACION', style: 'tableHeader'}, {text: 'INF-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{text: '', style: 'tableHeader', alignment: 'center'},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'SIC-110', style: 'tableHeader', alignment: 'center'}, {text: 'SISTEMAS INFORMATICOS CONTABLES', style: 'tableHeader'},{text: 'CBA-120', style: 'tableHeader', alignment: 'center'},{text: '', style: 'tableHeader',alignment: 'center'},{},{},{},{},{text: 'SI', style: 'tableHeader', alignment: 'center'},{text: 'SI', style: 'tableHeader', alignment: 'center'}],






				]
			}
		},

      {text: '\n', style: 'header',decoration: 'underline' },
      ],
      Style: {
        // alignment: 'justify'
      }

    }
    pdfMake.createPdf(dd).open();
  }
  openHabilDefensaGrado(){
    var dd = {
      content: [
        {
          text: 'Oruro, 9 de mayo de 2022\nCite: UNIOR/DAyR Nº 0010/2022\n\n\n',
          style: 'header'
        },
        {
          text: [
                'Señores\n\n',

            {text: 'ILUSTRE COLEGIO DE ABOGADOS DE ORURO ', fontSize: 11, bold: true},

            {text: 	'\nCalle Washington y Adolfo Mier Nº 1542\nTeléfono: 5250119', fontSize: 10},
            {text: '\nOruro', italics: true, fontSize: 10,bold: true},
            '\n\n'
          ]
        },
        {text: '\nREF.: HABILITACIÓN A DEFENSA DE GRADO', italics: true, fontSize: 12,bold: true},
        {
          style: 'bigger',
          italics: false,
          text: [
            '\n\nDe mi consideración:\n\n',
            {text: 'En cumplimiento al Reglamento Específico de Habilitaciones a Defensa de Grado de Universidades Privadas, aprobado mediante Resolución Ministerial N° 2980 del 29 de diciembre de 2017 y para fines consiguientes, comunico a usted(es) que el estudiante ',italics: true, fontSize: 11 },
            {text: '  PINTO TAPIA JOHAN GONZALO, ', fontSize: 11,bold: true},
            {text: 'de la carrera de ',italics: true, fontSize: 11 },
            {text: ' DERECHO',italics: true, fontSize: 11,bold: true},
            {text: ' a nivel de ',italics: true, fontSize: 11 },
            {text: ' LICENCIATURA ',italics: true, fontSize: 11,bold: true},
              {text: ' de la ',fontSize: 11 },
            {text: ' UNIVERSIDAD PRIVADA DE ORURO', fontSize: 11,bold: true},
            {text: ', ha sido habilitado para la Defensa de Grado en la modalidad de ',fontSize: 11 },
            {text: 'TESIS DE LICENCIATURA', fontSize: 11,bold: true},
            {text: '; a cuyo efecto, impetro la designación del Tribunal Externo en representación del Ministerio de Educación, mismo que previo al inicio de la Defensa de Grado deberá verificar la existencia de la documentación exigida en el Formulario de Habilitación de Estudiantes a Defensa de Grado que se halla en File Académico.',fontSize: 11 },
            {text: '\n\n Sin otro particular me despido con las atenciones más distinguidas. Atentamente.',fontSize: 11 },

          ]
        }
      ],
      styles: {
        header: {
          fontSize: 9,
          bold: true,
          alignment: 'right',
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }

    }
    pdfMake.createPdf(dd).open();
  }
openHistorialAcademicoParcial(){
  var dd = {
    pageOrientation: 'landscape',
    pageMargins: [ 70, 20, 20, 20 ],
	content: [

		{text: 'UNIVERSIDAD PRIVADA DE ORURO ', style: 'header',decoration: 'underline' },

		{
			style: 'tableExample',
			table: {
				body: [
					[''],

				]

			}
		},
		{

			style: 'tableExample',
			table: {
			    widths: [100,50, 100, 140,],
				body: [

					[
						'','','',
						{
							border: [true, true, true, true],
							text: 'HISTORIAL ACADEMICO'
						},

					],
				['','','',''
				    ],

				]
			},
			layout: {
				defaultBorder: false,
			}

		},
		{

			style: 'tableExample',
			table: {
			    widths: [50,50, 100, 140,],
				body: [

					[
						'codigo:',
						{
							border: [true, true, true, true],
							text: '5724'
						},
						'MATRICULA:',
						{
							border: [true, true, true, true],
							text: 'SIS0756'
						},
					],
					[
						'Nombre:',
                    	{
                    	    colSpan: 3,
							border: [true, true, true, true],
							text: 'CAREAGA VEIZAGA DANIEL JESUS'
						},
						'',
						''
					],
					[
						'carrera:',
						{
                    	    colSpan: 3,
							border: [true, true, true, true],
							text: 'INGENIERIA DE SISTEMAS (R)'
						},
						'',
						''
					],
					['','','','']
				]
			},
			layout: {
				defaultBorder: false,
			}

		},
		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: ['auto',310, 50, 140, 'auto','auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [

					[{text: 'CODIGO', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true}, {text: 'NOTA', style: 'tableHeader', alignment: 'center',bold: true},{text: 'NOTA LITERAR', style: 'tableHeader', alignment: 'center',bold: true},{text: 'ESTADO', style: 'tableHeader', alignment: 'center',bold: true},{text: 'TURNO', style: 'tableHeader', alignment: 'center',bold: true}],
                	[{text: '2/2021', style: 'tableHeader', colSpan: 6}, {}, {},{},{},{}],
					[{text: 'ADM-100', style: 'tableHeader', alignment: 'center'}, {text: 'ADMINISTRACION I', style: 'tableHeader'}, {text: '77', style: 'tableHeader', alignment: 'center'},{text: 'setenta y siete', style: 'tableHeader',alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
					[{text: 'ALF-100', style: 'tableHeader', alignment: 'center'}, {text: 'ALGEBRA Y LOGICA FORMAL', style: 'tableHeader'}, {text: '52', style: 'tableHeader', alignment: 'center'},{text: 'Cincuenta y dos', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
		        	[{text: 'CAL-100', style: 'tableHeader', alignment: 'center'}, {text: 'CALCULO I', style: 'tableHeader'}, {text: '86', style: 'tableHeader', alignment: 'center'},{text: 'ochenta y seis', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
                    [{text: 'INF-100', style: 'tableHeader', alignment: 'center'}, {text: 'INFORMATICA I', style: 'tableHeader'}, {text: '93', style: 'tableHeader', alignment: 'center'},{text: 'noventa y tres', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ISO-100', style: 'tableHeader', alignment: 'center'}, {text: 'INGENIERIA DE SISTEMAS EN LAS ORGANIZACIONES', style: 'tableHeader'}, {text: '55', style: 'tableHeader', alignment: 'center'},{text: 'Cincuenta y cinco', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ING-100', style: 'tableHeader', alignment: 'center'}, {text: 'INGLES', style: 'tableHeader'}, {text: '77', style: 'tableHeader', alignment: 'center'},{text: 'setenta y siete', style: 'tableHeader', alignment: 'center'},{text: 'Aprobado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
		        	[{text: '1/2022', style: 'tableHeader', colSpan: 6}, {}, {},{},{},{}],
					[{text: 'ALL-110', style: 'tableHeader', alignment: 'center'}, {text: 'ALGEBRA LINEAL', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: 'N.S.P', style: 'tableHeader', alignment: 'center'},{text: 'Abandonado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ARC-110', style: 'tableHeader', alignment: 'center'}, {text: 'ARQUITECTURA COMPUTACIONAL', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: '-', style: 'tableHeader', alignment: 'center'},{text: 'Proceso', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'CAL-110', style: 'tableHeader', alignment: 'center'}, {text: 'CALCULO II', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: '-', style: 'tableHeader', alignment: 'center'},{text: 'Proceso', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'INF-110', style: 'tableHeader', alignment: 'center'}, {text: 'INFORMATICA II', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: 'N.S.P', style: 'tableHeader', alignment: 'center'},{text: 'Abandonado', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
			    	[{text: 'ING-110', style: 'tableHeader', alignment: 'center'}, {text: 'INGLES', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: '-', style: 'tableHeader', alignment: 'center'},{text: 'Proceso', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
				[{text: 'MEC-110', style: 'tableHeader', alignment: 'center'}, {text: 'MECANICA CLASICA', style: 'tableHeader'}, {text: '0', style: 'tableHeader', alignment: 'center'},{text: '-', style: 'tableHeader', alignment: 'center'},{text: 'Proceso', style: 'tableHeader', alignment: 'center'},{text: 'Tarde', style: 'tableHeader', alignment: 'center'}],
				]
			}
		},

		{text: '\n', style: 'header',decoration: 'underline' },
		{text: 'DOCUMENTOS ENTREGADOS:', style: 'header' },

		{
			style: 'tableExample',
			table: {
			    widths: [600],
			    heights: [100],

				body: [
					[''],
				]
			}
		},
	],
	Style: {
		// alignment: 'justify'
	}

  }
  pdfMake.createPdf(dd).open();
}
openHistorialAcademicoCompleto(){
  var dd = {
    pageOrientation: 'landscape',
	content: [
        {text: [{text:'Historial Academico\n'},{text:'MEDICINA'}], style: 'subheader'},
				'\n',
				{

			style: 'tableExample',
			table: {
			    widths: [60,120,130,100,100,10,50,100],
				body: [
						[
						{text:'NOMBRE:',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'CORRALES LEDESMA MILENKA DANITZA',fontSize: 10,
							colSpan: 4

						},
						'','','',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'Nº SERIE:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '5029',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
			'\n',
			{

			style: 'tableExample',
			table: {
			    widths: [60,70,70,30,70,100,50,220],
				body: [
						[
						{text:'MATRICULA',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'MED0261',fontSize: 10,

						},
						'',{
							border:  [false,false,false ,false],
							text: 'C.I.',
						},
							{
							border: [true ,true,true ,true],
							text: '728387',fontSize: 10,

						},'',
						{text:'GRADO:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: 'LICENCIATURA',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},

		'\n',
		{
			style: 'tableExample',

			color: '#444',
			table: {
				widths: [20, 38, 239, 25,66,80,75,26,18,18,45],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
				    [ {text:'SEM',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'COD',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'}, {text:'MATERIA', alignment: 'center',style: 'tableHeader',fontSize: 9,fillColor: '#dedede'},{text:'NOTA',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'ESTADO',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'PRE-REQUISITO',style: 'tableHeader',fontSize:9,fillColor: '#dedede'},{text:'OBSERVACIONES',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'CRED',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'HT',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'HP',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'},{text:'TOTAL SEMESTRE',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'}],
					[{text: '1/2011', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'ANA-100',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA HUMANA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'60',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'CMP-100',fontSize: 9,style: 'tableHeader'}, {text:'COMPUTACION', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'GEN-100',fontSize: 9,style: 'tableHeader'}, {text:'GENETICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'HIS-100',fontSize: 9,style: 'tableHeader'}, {text:'HISTOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'MET-100',fontSize: 9,style: 'tableHeader'}, {text:'METODOLOGIA DE LA INVESTIGACION', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'1',fontSize: 9,style: 'tableHeader'},{text:'IDI-100',fontSize: 9,style: 'tableHeader'}, {text:'QUECHUA, AYMARA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[{text: '2/2011', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'ANA-110',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA HUMANA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'61',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'ANA-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'BIE-100',fontSize: 9,style: 'tableHeader'}, {text:'BIOESTADISTICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'BIF-100',fontSize: 9,style: 'tableHeader'}, {text:'BIOFISICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'EMB-100',fontSize: 9,style: 'tableHeader'}, {text:'EMBRIOLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'56',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'GEN-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'HIS-110',fontSize: 9,style: 'tableHeader'}, {text:'HISTOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'2',fontSize: 9,style: 'tableHeader'},{text:'IDI-110',fontSize: 9,style: 'tableHeader'}, {text:'QUECHUA Y AYMARA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'72',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'IDI-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2012', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'PAT-100',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA PATOLOGICA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-110/ANA-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'BQM-100',fontSize: 9,style: 'tableHeader'}, {text:'BIOQUIMICA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'56',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-110/BIF-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'FIS-100',fontSize: 9,style: 'tableHeader'}, {text:'FISIOLOGIA HUMANA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'ANA-110/BIF-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'ING-100',fontSize: 9,style: 'tableHeader'}, {text:'INGLES I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'53',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'MIC-100',fontSize: 9,style: 'tableHeader'}, {text:'MICROBIOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'31',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'PAR-100',fontSize: 9,style: 'tableHeader'}, {text:'PARASITOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'69',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'SPU-100',fontSize: 9,style: 'tableHeader'}, {text:'SALUD PUBLICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[{text: '2/2012', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'3',fontSize: 9,style: 'tableHeader'},{text:'MIC-100',fontSize: 9,style: 'tableHeader'}, {text:'MICROBIOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'58',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'HIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'PAT-110',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA PATOLOGICA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PAT-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'BQM-110',fontSize: 9,style: 'tableHeader'}, {text:'BIOQUIMICA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'34',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'BQM-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'BQM-110',fontSize: 9,style: 'tableHeader'}, {text:'BIOQUIMICA III', alignment: '',style: 'tableHeader',fontSize: 9},{text:'52',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'BQM-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'ETP-100',fontSize: 9,style: 'tableHeader'}, {text:'ETICA PROFESIONAL', alignment: '',style: 'tableHeader',fontSize: 9},{text:'62',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'FIS-110',fontSize: 9,style: 'tableHeader'}, {text:'FISIOLOGIA HUMANA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'53',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'ING-110',fontSize: 9,style: 'tableHeader'}, {text:'INGLES II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'53',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'ING-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'PSI-100',fontSize: 9,style: 'tableHeader'}, {text:'PSICOLOGIA MEDICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'28',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2013', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'PAT-120',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA PATOLOGICA III', alignment: '',style: 'tableHeader',fontSize: 9},{text:'52',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PAT-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'ANE-100',fontSize: 9,style: 'tableHeader'}, {text:'ANESTESIOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'FTM-100',fontSize: 9,style: 'tableHeader'}, {text:'FARMACOLOGIA Y TERAPEUTICA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'28',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'BQM-110/FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'FIP-100',fontSize: 9,style: 'tableHeader'}, {text:'FISIOPATOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-110/PAT-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'IMA-100',fontSize: 9,style: 'tableHeader'}, {text:'IMAGENOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'52',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PAT-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'SEM-100',fontSize: 9,style: 'tableHeader'}, {text:'SEMIOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'25',fontSize: 9,style: 'tableHeader'},{text:'2T/REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'TEQ-100',fontSize: 9,style: 'tableHeader'}, {text:'TECNICA QUIRURGICA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[{text: '2/2013', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'MIC-110',fontSize: 9,style: 'tableHeader'}, {text:'MICROBIOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'48',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'MIC-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'FMT-100',fontSize: 9,style: 'tableHeader'}, {text:'FARMACOLOGIA Y TERAPEUTICA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'22',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'BQM-110/FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'5',fontSize: 9,style: 'tableHeader'},{text:'SEM-100',fontSize: 9,style: 'tableHeader'}, {text:'SEMIOLOGIA I', alignment: '',style: 'tableHeader',fontSize: 9},{text:'29',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIS-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'6',fontSize: 9,style: 'tableHeader'},{text:'PAT-130',fontSize: 9,style: 'tableHeader'}, {text:'ANATOMIA PATOLOGICA IV', alignment: '',style: 'tableHeader',fontSize: 9},{text:'26',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'TEQ-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'6',fontSize: 9,style: 'tableHeader'},{text:'FIP-110',fontSize: 9,style: 'tableHeader'}, {text:'FISIOPATOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'22',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'FIP-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'12',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'144',fontSize: 9,style: 'tableHeader'}],
					[ {text:'6',fontSize: 9,style: 'tableHeader'},{text:'IMA-110',fontSize: 9,style: 'tableHeader'}, {text:'IMAGENOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'27',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'IMA-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'6',fontSize: 9,style: 'tableHeader'},{text:'TEQ-110',fontSize: 9,style: 'tableHeader'}, {text:'TECNICA QUIRURGICA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'44',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'TEQ-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[{text: '2/2014', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'MIC-110',fontSize: 9,style: 'tableHeader'}, {text:'MICROBIOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'53',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'MIC-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'6',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'4',fontSize: 9,style: 'tableHeader'},{text:'PSI-100',fontSize: 9,style: 'tableHeader'}, {text:'PSICOLOGIA MEDICA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'71',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2015', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'8',fontSize: 9,style: 'tableHeader'},{text:'GIN-110',fontSize: 9,style: 'tableHeader'}, {text:'GINECOLOGIA Y OBSTETRICIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'65',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'GIN-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'8',fontSize: 9,style: 'tableHeader'},{text:'TRA-110',fontSize: 9,style: 'tableHeader'}, {text:'TRAUMATOLOGIA II', alignment: '',style: 'tableHeader',fontSize: 9},{text:'86',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'TRA-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'8',fontSize: 9,style: 'tableHeader'},{text:'URO-100',fontSize: 9,style: 'tableHeader'}, {text:'UROLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'23',fontSize: 9,style: 'tableHeader'},{text:'REPROBADO',fontSize: 9,style: 'tableHeader'},{text:'SEM110/TEQ-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
				    [{text: '2/2018', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'8',fontSize: 9,style: 'tableHeader'},{text:'EPI-100',fontSize: 9,style: 'tableHeader'}, {text:'EPIDEMIOLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'52',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'MIC-110/SPU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'8',fontSize: 9,style: 'tableHeader'},{text:'URO-100',fontSize: 9,style: 'tableHeader'}, {text:'UROLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'58',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'SEM110/TEQ-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2019', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'ADH-100',fontSize: 9,style: 'tableHeader'}, {text:'ADMINISTRACION HOSPITALARIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'90',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'SPU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'CIR-120',fontSize: 9,style: 'tableHeader'}, {text:'CIRUGIA III', alignment: '',style: 'tableHeader',fontSize: 9},{text:'75',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CIR-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'GIN-120',fontSize: 9,style: 'tableHeader'}, {text:'GINECOLOGIA Y OBSTETRICIA III', alignment: '',style: 'tableHeader',fontSize: 9},{text:'70',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'GIN-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'GAS-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA II -GASTROENTEROLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'58',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CAR-100/NEU-100/NEF-100/REU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'INF-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA II - INFECTOLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'2T/APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CAR-100/NEU-100/NEF-100/REU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'MEL-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA LEGAL', alignment: '',style: 'tableHeader',fontSize: 9},{text:'78',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'ETP-100/PAT130',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'72',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'NEC-100',fontSize: 9,style: 'tableHeader'}, {text:'NEUROLOGIA Y NEUROCIRUGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'66',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CIR-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'9',fontSize: 9,style: 'tableHeader'},{text:'PED-120',fontSize: 9,style: 'tableHeader'}, {text:'PEDIATRIA III', alignment: '',style: 'tableHeader',fontSize: 9},{text:'88',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PED-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[{text: '2/2019', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'CIR-130',fontSize: 9,style: 'tableHeader'}, {text:'CIRUGIA IV', alignment: '',style: 'tableHeader',fontSize: 9},{text:'62',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CIR-120',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'GIN-130',fontSize: 9,style: 'tableHeader'}, {text:'GINECOLOGIA Y OBSTETRICIA IV', alignment: '',style: 'tableHeader',fontSize: 9},{text:'63',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'GIN-120',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'END-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA II -ENDOCRINOLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'52',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CAR-100/NEU-100/NEF-100/REU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'HEM-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA II -HEMATOLOGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'53',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'CAR-100/NEU-100/NEF-100/REU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'MES-100',fontSize: 9,style: 'tableHeader'}, {text:'MEDICINA SOCIAL', alignment: '',style: 'tableHeader',fontSize: 9},{text:'76',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'SPU-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'PED-130',fontSize: 9,style: 'tableHeader'}, {text:'PEDIATRIA IV', alignment: '',style: 'tableHeader',fontSize: 9},{text:'63',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PED-120',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'8',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'PSQ-100',fontSize: 9,style: 'tableHeader'}, {text:'PSIQUIATRIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'72',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'PSI-100/SEM-110',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[ {text:'10',fontSize: 9,style: 'tableHeader'},{text:'MEF-100',fontSize: 9,style: 'tableHeader'}, {text:'SALUD FAMILIAR Y COMUNITARIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'56',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'SPI-100/EPI-100',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'10',fontSize: 9,style: 'tableHeader'},{text:'4',fontSize: 9,style: 'tableHeader'},{text:'2',fontSize: 9,style: 'tableHeader'},{text:'108',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2020', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'11',fontSize: 9,style: 'tableHeader'},{text:'IRG-100',fontSize: 9,style: 'tableHeader'}, {text:'INTERNADO ROTATORIO DE GINECOLOGIA Y OBSTETRICIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'78',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'40',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'720',fontSize: 9,style: 'tableHeader'}],
					[ {text:'11',fontSize: 9,style: 'tableHeader'},{text:'IRM-100',fontSize: 9,style: 'tableHeader'}, {text:'INTERNADO ROTATORIO DE SALUD COMUNITARIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'78',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'40',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'720',fontSize: 9,style: 'tableHeader'}],
					[{text: '1/2021', style: 'tableHeader', colSpan: 11,  fontSize: 9,alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
					[ {text:'11',fontSize: 9,style: 'tableHeader'},{text:'IRC-100',fontSize: 9,style: 'tableHeader'}, {text:'INTERNADO ROTATORIO DE CIRUGIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'80',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'40',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'640',fontSize: 9,style: 'tableHeader'}],
				    [ {text:'11',fontSize: 9,style: 'tableHeader'},{text:'IRM-100',fontSize: 9,style: 'tableHeader'}, {text:'INTERNADO ROTATORIO DE MEDICINA INTERNA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'51',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'40',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'640',fontSize: 9,style: 'tableHeader'}],
				    [ {text:'11',fontSize: 9,style: 'tableHeader'},{text:'IRP-100',fontSize: 9,style: 'tableHeader'}, {text:'INTERNADO ROTATORIO DE PEDIATRIA', alignment: '',style: 'tableHeader',fontSize: 9},{text:'71',fontSize: 9,style: 'tableHeader'},{text:'APROBADO',fontSize: 9,style: 'tableHeader'},{text:'Ninguno',style: 'tableHeader',fontSize:9},{text:'',fontSize: 9,style: 'tableHeader'},{text:'40',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'0',fontSize: 9,style: 'tableHeader'},{text:'640',fontSize: 9,style: 'tableHeader'}],
				]

			}
		},
		'\N',
    {

			style: 'tableExample',
			table: {
			    widths: [200,250,150,100],
				body: [
						[
						'',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'HORAS ACADEMICAS VENCIDAS:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '10920',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
			{

			style: 'tableExample',
			table: {
			    widths: [200,230,170,100],
				body: [
						[
						'',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'TOTAL ASIGNATURAS APROBADAS:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '79',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
		},
    {

			style: 'tableExample',
			table: {
			    widths: [200,210,190,100],
				body: [
						[
						'',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'TOTAL ASIGNATURAS CONVALIDADAS:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '10',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},{

			style: 'tableExample',
			table: {
			    widths: [200,220,180,100],
				body: [
						[
						'',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'TOTAL ASIGNATURAS HOMOLOGADAS:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '0',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
			{

			style: 'tableExample',
			table: {
			    widths: [200,130,270,100],
				body: [
						[
						'',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'PROMEDIO DE CALIFICACIONES ASIGNATURAS AROBADAS:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: '59.13',fontSize: 10

						},

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
		}
	],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    }
  }
  pdfMake.createPdf(dd).open();
}
openInformeConv(){
  var dd = {

    pageMargins: [ 16, 10, 16 ,16],
    pageOrientation: 'landscape',
    pageSize: 'A4',
	content: [
	 { text:'Universidad Privada de Oruro',alignment: 'right',bold: true,},
		{

			style: 'tableExample',
			table: {
			    widths: [100,500, 100],
				body: [

					['',
						{

							border: [true,true,true, true],
							text: 'INFORME DE CONVALIDACION',
							style: 'header',
					    	bold: true,
					    	fontSize: 16,
					    	alignment: 'center',

						},''
					],
				['','',''
				    ],

				]
			},
			layout: {
				defaultBorder: false,
			}

		},
		{

			style: 'tableExample',
			table: {
			    widths: [20,70,20,80,390,70,10,60],
				body: [
						[
						{text:'',border: [false,false,false ,false]},
                    	{
							border:[false,false,false ,false],
							text: '',
							colSpan: 4

						},
						'','','',{text:'INF. tec Nro',	alignment: ''},
						{
							border: [true ,true,true ,true],
							text: '1441/2022',fontSize: 10,
							colSpan: 2,
						},''

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
		{

			style: 'tableExample',
			table: {
			    widths: [130,60,20,130,130,180,10,60],
				body: [
						[
						{text:'NOMBRE DEL ESTUDIANTE:',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'CONDORI DIEGO HIBER',fontSize: 10,
							colSpan: 3

						},
						'','','',{text:'',	alignment: ''},
						{
							border: [true ,true,true ,true],
							text: 'PAGE 2 of 2',fontSize: 10,
							colSpan: 2,
						},''

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
				'\n',
				{

			style: 'tableExample',
			table: {
			    widths: [100,100,40,100,10,88,291,9],
				body: [
						[
						{text:'UNIV. RECEPTORA:',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'UNIVERSIDAD PRIVADA DE ORURO',fontSize: 10,
							colSpan: 3

						},
						'','',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'UNIV. DE ORIGEN:',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: 'UNIVERSIDAD MAYOR REAL Y PONTIFICIA DE SAN FRANSISCO X',fontSize: 10

						},''

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},
			'',
			{

			style: 'tableExample',
			table: {
			    widths: [100,100,40,100,10,88,291,9],
				body: [
						[
						{text:'CARRERA:',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'ODONTOLOGIA (R)',fontSize: 10,
							colSpan: 3

						},
						'','',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'CARRERA ORIGEN',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: 'ODONTOLOGIA',fontSize: 10

						},''

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
			},

		{
			style: 'tableExample',
			table: {
			    widths: [100,100,40,100,10,88,291,9],
				body: [
						[
						{text:'NIVEL:',border: [false,false,false ,false],fontSize: 10},
                    	{
							border: [true ,true,true ,true],
							text: 'LICENCIATURA',fontSize: 10,
							colSpan: 3

						},
						'','',{
							border:  [false,false,false ,false],
							text: '',

						},
						{text:'NIVEL',	fontSize: 10},
						{
							border: [true ,true,true ,true],
							text: 'LICENCIATURA',fontSize: 10

						},''

					],

				]

			},
			layout: {
				defaultBorder: false,
			}
},'\n',
		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: ['auto',220, 70,'auto', 220,30,100],
				// keepWithHeaderRows: 1,
				body: [

				 [{text: 'SIGLA', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'MATERIA', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}, {text: 'PREREQUISITO', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'SIGLA ORIGEN', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'MATERIA ORIGEN', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: '%', styleA: 'tableHeader', alignment: 'center',bold: true,fontSize: 10},{text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
	             [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'FARMACOLOGIA TERAPEUTICA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'FMT-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PAT-302', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'FARMACOLOGIA', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 54', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ODONTOPEDIATRIA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'IMG-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-402', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ODONTOPEDIATRIA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'OPERATORIA II Y ENDODONCIA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'OCL-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-304', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'OPERATORIA Y ENDODONCIA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 55', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ORTODONCIA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'OCL-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-404', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ORTODONCIA I ', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 52', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PROTESIS FIJA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'OPE-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-307', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PROSTODONCIA FIJA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 62', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PROTESIS REMOVIBLE I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'ADT-110', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-308', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PROSTODONCIA REMOVIBLE I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 67', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PREVENTIVA Y PERIODONCIA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'PRP-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-405', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PERIODONCIA II', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'SEMESTRE                  7', style: 'tableHeader',colSpan: 7,fontSize: 10,border: [false ,true,false,false],},{},{},{},{},{},{}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'CIRUGIA BUCAL III', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'CIB-110', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-401', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'CIRUGIA BUCAL II', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 53', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ODONTOPEDIATRIA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'ODP-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-402', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ODONTOPEDIATRIA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'OPERATORIA III Y ENDODONCIA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'OPE-110', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-403/EST-400', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'OPERATORIA DENTAL II/ ENDODONCIA II', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75/75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 54', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'ORTODONCIA II Y ORTOPEDIA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'ORT-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-404', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ORTODONCIA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 52', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PROTESIS FIJA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'PRF-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-307', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PROSTODONCIA FIJA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 62', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PROTESIS REMOVIBLE II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'PRM-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-308', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PROSTODONCIA REMOVIBLE I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 67', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PREVENTIVA Y PERIODONCIA III', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'OPE-110', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-405', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PERIODONCIA II', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'SALUD PUBLICA I', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'PRP-110', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'SLP-202', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ESTOMATOLOGIA SOCIAL PREVENTIVA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'SEMESTRE                  7', style: 'tableHeader',colSpan: 7,fontSize: 10,border: [false ,true,false,false],},{},{},{},{},{},{}] ,
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'PREVENTIVA Y PERIODONCIA IV', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'PRP-120', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'EST-507', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'PERIODONCIA III', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 53', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}],
                 [{text: 'FMT-110', style: 'tableHeader', alignment: 'center',fontSize: 10}, {text: 'SALUD PUBLICA II', style: 'tableHeader', alignment: '',fontSize: 10}, {text: 'SPU-100', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'SLP-202', style: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'ESTOMATOLOGIA SOCIAL PREVENTIVA I', style: 'tableHeader', alignment: '',fontSize: 10},{text: '75', styleA: 'tableHeader', alignment: 'center',fontSize: 10},{text: 'NOTA: 51', style: 'tableHeader', alignment: 'center',bold: true,fontSize: 10}]

    ]
			}
		},

	{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: [520,200, 50],
				// keepWithHeaderRows: 1,
				body: [
					[{text: '', style: 'tableHeader', alignment: 'center',bold: true,colSpan: 3,border: [false,false, false,true]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}],
					[{text: '', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]}, {text: 'TOTAL MATERIAS A CONVALIDAR', style: 'tableHeader', alignment: 'center',bold: true,border: [false,false,false ,false]}, {text: '', style: 'tableHeader', alignment: 'center',bold: true}]
	]
			}
		},

		{text: '\nINSTRUCTIVO:                   Las materias que se encuentren convalidadas en el presente informe figuran como"Materia Convalidada"una vez que el', style: 'header',decoration: 'overline'},
    {text: '.                                            requisito haya sido aprobado.', style: 'header'}
    ],
    Style: {
      // alignment: 'justify'
    }

  }
  pdfMake.createPdf(dd).open();
}
openMemorandumDesigDocente(){
  var dd = {
    pageMargins: [ 50, 10, 60, 10 ],
 content: [

   {
     text: 'Universidad Privada de Oruro',
     style: 'header',

   },
   {
     text: [
            {text: '!Orgullo orureño!\n\n\n\n',style:'bigger'},
       {text: '', fontSize: 11, italics: true},
       {text: 	'\nMEMORANDUM\n',fontSize: 14,bold: true,alignment: 'center',decoration: 'underline' },
       {text: '\n\nVRA - SIS-039/2019\n\n',alignment: 'right',bold: true},
     ]
   },
   {
     style: 'tableExample',
     table: {
         widths: [250, 220],
       body: [

         [
           {
             border: [false, false, true, true],
             text: 'Para:                                                                                      ING. FLORES MAGNE EVELYN MARCIA             ',
             alignment: 'justify',
           },
           {
               border: [false, false, false, true],
             text: ' Asunto:                                                  designacion de docente\n      oruro,25 de marzo de 2019'
           },

         ],

       ]
     }
   },
   {text: '\ndistinguido (a) profesional:',fontSize: 11,bold: true},
   {text: 	'\n\n De conformidad a normas y procedimientos de nuestra Universidad y luego de haber realizado la evaluacion de sus antecedentes profesionales, es grato comunicarle que a sido designado(a) para la prestacion de servicios en orden civil como DOCENTE  de la materia de ASI - 170 ADMINISTRACION DE SISTEMAS DE INFORMACION, de la carrera de INGENIERIA DE SISTEMAS, correspondiente al SEMESTRE 1/2019 INICIANDO EL 28/01/2019 al 29/06/2019.\n\n',fontSize: 11,italics: true,alignment: 'justify',bold: true},
 ,

   {
     text: [
       {text: '\n\n Para fines administrativos y cancelacion de honorarios se considern las horas efectivamente trabajadas y registradas en el Sistema de Control de Asisitencia. Asi mismo debera registrar todas las notas finales en el Sistema Informatico con firma y sello en el Acta de Notas respectivas.',fontSize: 11,bold: true},
           {text: ' \n\nA tiempo de felicitarle por la presente designacion,ruego dar estricta observacion y cumplimiento al Reglamento Docente,los instructivos,horarios y periodos de clase asignados.\n\nCon este particular, saludo a usted con atencion.', fontSize: 10,alignment: 'left',bold: true} ,
       {text: '\n',style: 'bigger'},
       {text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',},
     {	text: '\n\n\n\n\nUNIOR',
     alignment: 'center'},

     ]
   }
  ],
  styles: {
    header: {
        fonts: 'curier',
      fontSize: 24,
      bold: true,
      alignment: 'center',


    },
    bigger: {
        fonts: 'curier',
      fontSize: 14,
      italics: true,
      alignment: 'center',

    }
  }

  }
    pdfMake.createPdf(dd).open();
  }
openPlanEstudios(){
  var dd = {
    content: [
          {text: [{text:'Plan deEstudios\n'},{text:'ADMINISTRACION DE EMPRESAS'}], style: 'subheader'},

      {
        style: 'tableExample',

        color: '#444',
        table: {
          widths: [40, 80, 270, 100],
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [
              [ {text:'SEM',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'}, {text:'COD',fontSize: 9,style: 'tableHeader',fillColor: '#dedede'}, {text:'MATERIA', alignment: 'center',style: 'tableHeader',fontSize: 9,fillColor: '#dedede'},{text:'PRE-REQUISITO',style: 'tableHeader',fontSize:9,fillColor: '#dedede'}],
            [{text: 'PRIMER SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '1\n', italics: true, fontSize: 9},{text: '1\n', italics: true,fontSize: 9},{text: '1\n', italics: true,fontSize: 9},{text: '1\n', italics: true,fontSize: 9},{text: '1\n', italics: true,fontSize: 9},{text: '1\n', italics: true,fontSize: 9}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-100\n',fontSize: 9},{text:'CPA-100\n',fontSize: 9},{text:'ECO-100\n',fontSize: 9},{text:'ING-100\n',fontSize: 9},{text:'MAT-100\n',fontSize: 9},{text:'PSI-100\n',fontSize: 9}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION I\n',fontSize: 9},{text:'CONTABILIDAD BASICA\n',fontSize: 9},{text:'ECONOMIA POLITICA\n',fontSize: 9},{text:'INGLES I\n',fontSize: 9},{text:'MATEMATICAS GENERAL I\n',fontSize: 9},{text:'PSICOLOGIA SOCIAL\n',fontSize: 9}], alignment: 'left'},
                  {text:[{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9}], alignment: 'center'}],
            [{text: 'SEGUNDO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '2\n', italics: true, fontSize: 8},{text: '2\n', italics: true,fontSize: 8},{text: '2\n', italics: true,fontSize: 8},{text: '2\n', italics: true,fontSize: 8},{text: '2\n', italics: true,fontSize: 8},{text: '2\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-110\n',fontSize: 8},{text:'CPA-110\n',fontSize: 8},{text:'INF-100\n',fontSize: 8},{text:'ING-110\n',fontSize: 8},{text:'MAT-110\n',fontSize: 8},{text:'SOC-100\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION II\n',fontSize: 8},{text:'CONTABILIDAD INTERMEDIA\n',fontSize: 8},{text:'INFORMATICA\n',fontSize: 8},{text:'INGLES II\n',fontSize: 8},{text:'MATEMATICAS GENERAL II\n',fontSize: 8},{text:'SOCIOLOGIA\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'ADM-100\n',fontSize: 8},{text:'CPA-100\n',fontSize: 8},{text:'ninguno\n',fontSize: 8},{text:'ING-100\n',fontSize: 8},{text:'MAT-100\n',fontSize: 8},{text:'ninguno\n',fontSize: 8}], alignment: 'center'}],
            [{text: 'TERCER SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '3\n', italics: true, fontSize: 8},{text: '3\n', italics: true,fontSize: 8},{text: '3\n', italics: true,fontSize: 8},{text: '3\n', italics: true,fontSize: 8},{text: '3\n', italics: true,fontSize: 8},{text: '3\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-120\n',fontSize: 8},{text:'CPA-120\n',fontSize: 8},{text:'CPA-150\n',fontSize: 8},{text:'ING-120\n',fontSize: 8},{text:'MET-100\n',fontSize: 8},{text:'PSI-110\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION III\n',fontSize: 8},{text:'CONTABILIDAD SUPERIOR\n',fontSize: 8},{text:'CONTABILIDAD DE COSTOS\n',fontSize: 8},{text:'INGLES III\n',fontSize: 8},{text:'METODOLOGIA DE LA INVESTIGACION\n',fontSize: 8},{text:'PSICOLOGIA DE LAS ORGANIZACIONES\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'ADM-110\n',fontSize: 8},{text:'CPA-110\n',fontSize: 8},{text:'CPA-110\n',fontSize: 8},{text:'ING-110\n',fontSize: 8},{text:'ninguno\n',fontSize: 8},{text:'PSI-100\n',fontSize: 8}], alignment: 'center'}],
            [{text: 'CUARTO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '4\n', italics: true, fontSize: 8},{text: '4\n', italics: true,fontSize: 8},{text: '4\n', italics: true,fontSize: 8},{text: '4\n', italics: true,fontSize: 8},{text: '4\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-130\n',fontSize: 8},{text:'ECO-110\n',fontSize: 8},{text:'INF-110\n',fontSize: 8},{text:'MAT-120\n',fontSize: 8},{text:'MER-100\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION DE PERSONAL\n',fontSize: 8},{text:'MICROECONOMIA\n',fontSize: 8},{text:'INFORMATICA II\n',fontSize: 8},{text:'ESTADISTICA I\n',fontSize: 8},{text:'MERCADOTECNIA I\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'ADM-120\\n',fontSize: 8},{text:'ECO-100\n',fontSize: 8},{text:'INF-100\n',fontSize: 8},{text:'MAT-110\n',fontSize: 8},{text:'ADM-120\n',fontSize: 8}], alignment: 'center'}],
            [{text: 'QUINTO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '5\n', italics: true, fontSize: 8},{text: '5\n', italics: true,fontSize: 8},{text: '5\n', italics: true,fontSize: 8},{text: '5\n', italics: true,fontSize: 8},{text: '5\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'DER-500\n',fontSize: 8},{text:'ECO-120\n',fontSize: 8},{text:'FIN-100\n',fontSize: 8},{text:'INO-100\n',fontSize: 8},{text:'MER-110\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'DERECHO ADMINISTRATIVO Y CIENCIA ADMINISTRATIVA\n',fontSize: 8},{text:'MACROECONOMIA\n',fontSize: 8},{text:'FINANZAS I\n',fontSize: 8},{text:'INVESTIGACION OPERATIVA\n',fontSize: 8},{text:'MERCADOTECNIA II\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'ADM-120\n',fontSize: 8},{text:'ECO-110\n',fontSize: 8},{text:'CPA-120/CPA-150\n',fontSize: 8},{text:'MAT-120\n',fontSize: 8},{text:'MER-100\n',fontSize: 8}], alignment: 'center'}],
              [{text: 'SEXTO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '6\n', italics: true, fontSize: 8},{text: '6\n', italics: true,fontSize: 8},{text: '6\n', italics: true,fontSize: 8},{text: '6\n', italics: true,fontSize: 8},{text: '6\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-140\n',fontSize: 8},{text:'FIN-110\n',fontSize: 8},{text:'INO-110\n',fontSize: 8},{text:'MAT-130\n',fontSize: 8},{text:'MAT-180\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION PUBLICA\n',fontSize: 8},{text:'FINANZAS II\n',fontSize: 8},{text:'PRODUCCION\n',fontSize: 8},{text:'ESTADISTICA II\n',fontSize: 8},{text:'MATEMATICA FINANCIERA\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'DER-500\n',fontSize: 8},{text:'FIN-100\n',fontSize: 8},{text:'ECO-120/INO-100\n',fontSize: 8},{text:'MAT-120\n',fontSize: 8},{text:'FIN-100/MAT-120\n',fontSize: 8}], alignment: 'center'}],
              [{text: 'SEPTIMO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '7\n', italics: true, fontSize: 8},{text: '7\n', italics: true,fontSize: 8},{text: '7\n', italics: true,fontSize: 8},{text: '7\n', italics: true,fontSize: 8},{text: '7\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-150\n',fontSize: 8},{text:'ADM-160\n',fontSize: 8},{text:'ECO-130\n',fontSize: 8},{text:'ECO-140\n',fontSize: 8},{text:'FIN-120\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'ADMINISTRACION DE DESAROLLO\n',fontSize: 8},{text:'INTEGRACION\n',fontSize: 8},{text:'HISTORIA Y GEOGRAFIA ECONOMICA\n',fontSize: 8},{text:'COMERCIO EXTERIOR\n',fontSize: 8},{text:'ADMINISTRACION FINANCIERA\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'ADM-140\n',fontSize: 8},{text:'ADM-140\n',fontSize: 8},{text:'ECO-120\n',fontSize: 8},{text:'ECO-120\n',fontSize: 8},{text:'FIN-100\n',fontSize: 8}], alignment: 'center'}],
              [{text: 'OCTAVO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '8\n', italics: true, fontSize: 8},{text: '8\n', italics: true,fontSize: 8},{text: '8\n', italics: true,fontSize: 8},{text: '8\n', italics: true,fontSize: 8},{text: '8\n', italics: true,fontSize: 8}]
                  , alignment: 'center'},
                  {text:[	{text:'ADM-170\n',fontSize: 8},{text:'ADM-180\n',fontSize: 8},{text:'DER-501\n',fontSize: 8},{text:'ECO-150\n',fontSize: 8},{text:'ECO-170\n',fontSize: 8}], alignment: 'left'},
                  {text:[	{text:'GESTION EMPRESARIAL\n',fontSize: 8},{text:'ANALISIS EMPRESARIAL\n',fontSize: 8},{text:'LEGISLACION EMPRESARIAL\n',fontSize: 8},{text:'TEORIA MONETARIA\n',fontSize: 8},{text:'PREPARACION DE PROYECTOS I\n',fontSize: 8}], alignment: 'left'},
                  {text:[{text:'FIN-120\n',fontSize: 8},{text:'ADM-160\n',fontSize: 8},{text:'DER-500\n',fontSize: 8},{text:'ECO-120\n',fontSize: 8},{text:'INO-110/FIN-110\n',fontSize: 8}], alignment: 'center'}],
            [{text: 'NOVENO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '9\n', italics: true, fontSize: 9},{text: '9\n', italics: true,fontSize: 9},{text: '9\n', italics: true,fontSize: 9},{text: '9\n', italics: true,fontSize: 9},{text: '9\n', italics: true,fontSize: 9},{text: '9\n', italics: true,fontSize: 9}]
                  , alignment: 'center'},
                  {text:[	{text:'CPA-200\n',fontSize: 9},{text:'CPA-250\n',fontSize: 9},{text:'DER-502\n',fontSize: 9},{text:'ECO-180\n',fontSize: 9},{text:'ECO-190\n',fontSize: 9},{text:'SSR-100\n',fontSize: 9}], alignment: 'left'},
                  {text:[	{text:'PRESOPUESTOS\n',fontSize: 9},{text:'ANALISIS E INTERPRETACION DE ESTADOS FINACIEROS\n',fontSize: 9},{text:'COOPERATIVISMO\n',fontSize: 9},{text:'TEORIA FISCAL\n',fontSize: 9},{text:'EVALUACION Y ADMINISTRACION DE PROYECTOS\n',fontSize: 9},{text:'SEMINARIO SALUD SEXUAL REPRODUCTIVA(opcional)\n',fontSize: 9}], alignment: 'left'},
                  {text:[{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9},{text:'ninguno\n',fontSize: 9}], alignment: 'center'}],

                  [{text: 'DECIMO SEMESTRE', style: 'tableHeader', colSpan: 4,  fontSize: 9,alignment: 'left'}, {}, {},{}],
            [{text: [

                  {text: '10\n', italics: true, fontSize: 9}]
                  , alignment: 'center'},
                  {text:[	{text:'SEM-100\n',fontSize: 9}], alignment: 'left'},
                  {text:[	{text:'SEMINARIO DE GRADO\n',fontSize: 9}], alignment: 'left'},
                  {text:[{text:'todas\n',fontSize: 9}], alignment: 'center'}],


          ]

        }
      },

    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    }

  }
  pdfMake.createPdf(dd).open();
}
openResolucionConvAcad(){
  var dd = {
    content: [
      {
        text: 'Universidad Privada de Oruro',
        style: 'header',

      },
      {
        text: [
               {text: '!Orgullo orureño!\n\n\n',style:'bigger'},

          {text: 'RESOLUCION RECTORAL  RC - 1441 / 2022', fontSize: 14,alignment: 'center',bold: true },
          {text: 	'\nCONVALIDACION ACADEMICA\n',fontSize: 14,bold: true,alignment: 'center',decoration: 'underline' },
          {text: '\nVISTOS Y CONCIDERACIONES', fontSize: 14,alignment: '',bold: true },
          {text: '\nQue el Articulo 51 del Reglamento General de Universidades Privadas establecen que las Universidades Privadas podran recibir estudiantes de otras Universidadeslegalmente establecidas o de una carrera a otra dentro de la misma Universidad debiendo considerar y cumplir los requisitos establecidos en el Reglamento Especifico para Convalidacion de Asignatura(s).\n',fontSize: 11,alignment: 'left'},
        ]
      },
      {text: '\nPOR TANTO:',fontSize: 14,bold: true},
      {text: 	'La suscrita Rectora de la Universidad Privada de Oruro en el uso de sus especificas atribuciones.',fontSize: 11,alignment: 'justify'},
        {text: '\nRESUELVE:',fontSize: 14,bold: true},
        {text: 'ARTICULO UNICO.-',fontSize: 14,bold: true,decoration: 'underline'},
      {text: 'APROBAR el informe Tecnico Nº 1441 de convalidaciones academica, detallado a continuacion.\n\n\n\n',fontSize: 11,alignment: 'justify'},
    {
        style: 'tableExample',
        table: {
          widths: [303,100,100],
          body: [
                  [{text: '',	alignment: 'center' ,bold: true,fontSize: 8,border: [false, false, false, false]},{text: 'INFORME TECNICO N',	alignment: 'center' ,bold: true,fontSize: 8,border: [false, false, false, false]},{text: '1441 / 2022',	alignment: '' ,fontSize: 12} ],

          ]
        }
      },
    {
        style: 'tableExample',
        table: {
          widths: [160,352],
          body: [
                  [{text: 'NOMBRE DEL ESTUDIANTE:',	alignment: 'center' ,bold: true,fontSize: 12,border: [false, false, false, false]},{text: 'CONDORI DIEGO HIBER',	alignment: '' ,fontSize: 12} ],

          ]
        }
      },
    {
        style: 'tableExample',
        table: {
          widths: [55,168, 65,206],
          body: [
                  [{text: 'UNIVERSIDAD DE RECEPTORA',	alignment: 'center' ,bold: true,fontSize: 14,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 14},{text: 'UNIVERSIDAD DE ORIGEN',	alignment: 'center' ,bold: true,fontSize: 14,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8} ],
                [ {text: 'UNIVERSIDAD PRIVADA DE ORURO',	alignment: 'center' ,bold: true,fontSize: 12,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'UNIVERSIDAD REAL Y PONTIFICA DE SAN FRANSISCO XAVIER DE CHUQUISACA',	alignment: 'center' ,bold: true,fontSize: 12,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8} ],
                [ {text: 'CARRERA:',	alignment: '' ,bold: true,fontSize: 8},{text: 'ODONTOLOGIA (R)',	alignment: '' ,bold: true,fontSize: 8},{text: 'CARRERA:',	alignment: '' ,bold: true,fontSize: 8},{text: 'ODONTOLOGIA',	alignment: '' ,bold: true,fontSize: 8} ],
              [ {text: 'NIVEL:',	alignment: '' ,bold: true,fontSize: 8},{text: 'LICENCIATURA',	alignment: '' ,bold: true,fontSize: 8},{text: 'NIVEL:',	alignment: '' ,bold: true,fontSize: 8},{text: 'LICENCIATURA',	alignment: '' ,bold: true,fontSize: 8} ],

          ]
        }
      },
    {
        style: 'tableExample',
        table: {
          widths: [10,34, 170,34,170,25,24],
          body: [
            [ {text: 'Nº',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'SIGLA',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MATERIA',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'SIGLA',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MATERIA',	alignment: 'center' ,bold: true,fontSize: 8},{text: '%\nEQUIV.',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'NOTA',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '1',	alignment: 'center' ,fontSize: 8},{text: 'ANA-100',	alignment: 'center' ,fontSize: 8},{text: 'ANATOMIA HUMANA I',	alignment: '' ,fontSize: 8},{text: 'MOR-101',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ANATOMIA HUMANA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '2',	alignment: 'center' ,fontSize: 8},{text: 'BQM-100',	alignment: 'center' ,fontSize: 8},{text: 'BIOQUIMICA',	alignment: '' ,fontSize: 8},{text: 'FSL-102',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'BIOQUIMICA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '67',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '3',	alignment: 'center' ,fontSize: 8},{text: 'GYE-100',	alignment: 'center' ,fontSize: 8},{text: 'GENETICA Y EMBRIOLOGIA',	alignment: '' ,fontSize: 8},{text: 'MOR-103',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'EMBRIOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '4',	alignment: 'center' ,fontSize: 8},{text: 'HIS-100',	alignment: 'center' ,fontSize: 8},{text: 'HISTOLOGIA I',	alignment: '' ,fontSize: 8},{text: 'MOR-104',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'HISTOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '5',	alignment: 'center' ,fontSize: 8},{text: 'ADT-100',	alignment: 'center' ,fontSize: 8},{text: 'ANATOMIA DENTARIA I',	alignment: '' ,fontSize: 8},{text: 'MOR-201',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ANATOMIA DENTARIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '6',	alignment: 'center' ,fontSize: 8},{text: 'ANA-110',	alignment: 'center' ,fontSize: 8},{text: 'ANATOMIA HUMANA II',	alignment: '' ,fontSize: 8},{text: 'MOR-101',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ANATOMIA HUMANA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '7',	alignment: 'center' ,fontSize: 8},{text: 'HIS-110',	alignment: 'center' ,fontSize: 8},{text: 'HISTOLOGIA II',	alignment: '' ,fontSize: 8},{text: 'MOR-104',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'HISTOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '8',	alignment: 'center' ,fontSize: 8},{text: 'MIC-100',	alignment: 'center' ,fontSize: 8},{text: 'MICROBIOLOGIA I',	alignment: '' ,fontSize: 8},{text: 'PAT-205',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MICROBIOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '9',	alignment: 'center' ,fontSize: 8},{text: 'ADT-110',	alignment: 'center' ,fontSize: 8},{text: 'ANATOMIA DENTARIA II',	alignment: '' ,fontSize: 8},{text: 'MOR-201',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ANATOMIA DENTARIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '10',	alignment: 'center' ,fontSize: 8},{text: 'FIS-100',	alignment: 'center' ,fontSize: 8},{text: 'FISIOLOGIA HUMANA I',	alignment: '' ,fontSize: 8},{text: 'FSL-203',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'FISIOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '52',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '11',	alignment: 'center' ,fontSize: 8},{text: 'MAD-100',	alignment: 'center' ,fontSize: 8},{text: 'MATERIALES DENTALES I',	alignment: '' ,fontSize: 8},{text: 'EST-204',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MATERIALES ODONTOLOGICOS',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '12',	alignment: 'center' ,fontSize: 8},{text: 'MIC-110',	alignment: 'center' ,fontSize: 8},{text: 'MICROBIOLOGIA II',	alignment: '' ,fontSize: 8},{text: 'PAT-205',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MICROBIOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],

          ]
        }
      },

      {
        text: [
          {text: '\n\n ',fontSize: 11,bold: true},
              {text: ' \n', fontSize: 10,alignment: 'center',bold: true} ,
          {text: '',style: 'bigger'},
          {text: '\nEDIFICIO CENTRAL: calle junin Nº 348 esquina potosi - Telefonos: 5273780 - 5273781 - Fax: 5280745', fontSize: 10,alignment: 'center',bold: true},
          {text: '\nSEGUNDO EDIFICIO: calle ayacucho Nº 550 entre 6 de Octubre y Soria Galvarro - Telefonos: 5284586', fontSize: 10,alignment: 'center',bold: true},
  ]
      },
      {
        style: 'tableExample',
        table: {
          widths: [55,168, 65,206],
          body: [
                  [{text: 'UNIVERSIDAD DE RECEPTORA',	alignment: 'center' ,bold: true,fontSize: 14,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 14},{text: 'UNIVERSIDAD DE ORIGEN',	alignment: 'center' ,bold: true,fontSize: 14,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8} ],
                [ {text: 'UNIVERSIDAD PRIVADA DE ORURO',	alignment: 'center' ,bold: true,fontSize: 12,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'UNIVERSIDAD REAL Y PONTIFICA DE SAN FRANSISCO XAVIER DE CHUQUISACA',	alignment: 'center' ,bold: true,fontSize: 12,colSpan: 2},{text: '',	alignment: 'center' ,bold: true,fontSize: 8} ],
                [ {text: 'CARRERA:',	alignment: '' ,bold: true,fontSize: 8},{text: 'ODONTOLOGIA (R)',	alignment: '' ,bold: true,fontSize: 8},{text: 'CARRERA:',	alignment: '' ,bold: true,fontSize: 8},{text: 'ODONTOLOGIA',	alignment: '' ,bold: true,fontSize: 8} ],
              [ {text: 'NIVEL:',	alignment: '' ,bold: true,fontSize: 8},{text: 'LICENCIATURA',	alignment: '' ,bold: true,fontSize: 8},{text: 'NIVEL:',	alignment: '' ,bold: true,fontSize: 8},{text: 'LICENCIATURA',	alignment: '' ,bold: true,fontSize: 8} ],

          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: [10,34, 170,34,170,25,24],
          body: [
            [ {text: '13',	alignment: 'center' ,fontSize: 8},{text: 'PAG-100',	alignment: 'center' ,fontSize: 8},{text: 'PATOLOGIA GENERAL',	alignment: '' ,fontSize: 8},{text: 'PAT-206',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PATOLOGIA GENERAL',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '52',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '14',	alignment: 'center' ,fontSize: 8},{text: 'SEL-100',	alignment: 'center' ,fontSize: 8},{text: 'SEMOLOGIA GENERAL',	alignment: '' ,fontSize: 8},{text: 'PAT-207',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'SEMOLOGIA GENERAL',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '57',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '15',	alignment: 'center' ,fontSize: 8},{text: 'FIS-110',	alignment: 'center' ,fontSize: 8},{text: 'FISIOLOGIA HUMANA II',	alignment: '' ,fontSize: 8},{text: 'FSL-203',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'FISIOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '52',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '16',	alignment: 'center' ,fontSize: 8},{text: 'IMG-100',	alignment: 'center' ,fontSize: 8},{text: 'IMAGENOLOGIA I',	alignment: '' ,fontSize: 8},{text: 'PAT-309',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'RADIOLOGIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '57',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '17',	alignment: 'center' ,fontSize: 8},{text: 'MAD-110',	alignment: 'center' ,fontSize: 8},{text: 'MATERIALES DENTALES II',	alignment: '' ,fontSize: 8},{text: 'EST-204',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'MATERIALES ODONTOLOGICOS',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '18',	alignment: 'center' ,fontSize: 8},{text: 'PAE-100',	alignment: 'center' ,fontSize: 8},{text: 'PATOLOGIA ESTOMALOGICA',	alignment: '' ,fontSize: 8},{text: 'PAT-305',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PATOLOGIA ESTOMALOGICA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '63',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '19',	alignment: 'center' ,fontSize: 8},{text: 'SEE-100',	alignment: 'center' ,fontSize: 8},{text: 'SEMIOLOGIA ESTOMALOGICA',	alignment: '' ,fontSize: 8},{text: 'EST-310',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'SEMIOLOGIA ESTOMALOGICA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '20',	alignment: 'center' ,fontSize: 8},{text: 'CIB-100',	alignment: 'center' ,fontSize: 8},{text: 'CIRUGIA BUCAL I',	alignment: '' ,fontSize: 8},{text: 'EST-301',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'CIRUGIA Y PERIODONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '21',	alignment: 'center' ,fontSize: 8},{text: 'FMT-100',	alignment: 'center' ,fontSize: 8},{text: 'FARMACOLOGIA Y TERAPEUTICA I',	alignment: '' ,fontSize: 8},{text: 'PAT-302',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'FARMACOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '54',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '22',	alignment: 'center' ,fontSize: 8},{text: 'IMG-110',	alignment: 'center' ,fontSize: 8},{text: 'IMAGENOLOGIA II',	alignment: '' ,fontSize: 8},{text: 'PAT-309',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'RADIOLOGIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '57',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '23',	alignment: 'center' ,fontSize: 8},{text: 'OPE-100',	alignment: 'center' ,fontSize: 8},{text: 'OPERATORIA I',	alignment: '' ,fontSize: 8},{text: 'EST-304',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'OPERATORIA Y ENDODDONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '55',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '24',	alignment: 'center' ,fontSize: 8},{text: 'PRP-100',	alignment: 'center' ,fontSize: 8},{text: 'PREVENTIVA Y PERIODONCIA I',	alignment: '' ,fontSize: 8},{text: 'EST-301',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'CIRUGIA Y PERIODONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '25',	alignment: 'center' ,fontSize: 8},{text: 'CIB-110',	alignment: 'center' ,fontSize: 8},{text: 'CIRUGIA BUCAL II',	alignment: '' ,fontSize: 8},{text: 'EST-401',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'CIRUGIA BUCAL II',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '53',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '26',	alignment: 'center' ,fontSize: 8},{text: 'FMT-110',	alignment: 'center' ,fontSize: 8},{text: 'FARMACOLOGIA Y TERAPEUTICA II',	alignment: '' ,fontSize: 8},{text: 'PAT-302',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'FARMACOLOGIA',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '54',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '27',	alignment: 'center' ,fontSize: 8},{text: 'ODP-100',	alignment: 'center' ,fontSize: 8},{text: 'ODONTOPEDIATRIA I',	alignment: '' ,fontSize: 8},{text: 'EST-402',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ODONTOPEDIATRIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '28',	alignment: 'center' ,fontSize: 8},{text: 'OPE-110',	alignment: 'center' ,fontSize: 8},{text: 'OPERATORIA II Y ENDODONCIA I',	alignment: '' ,fontSize: 8},{text: 'EST-304',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'OPERATORIA Y ENDODONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '55',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '29',	alignment: 'center' ,fontSize: 8},{text: 'ORT-100',	alignment: 'center' ,fontSize: 8},{text: 'ORTODONCIA I',	alignment: '' ,fontSize: 8},{text: 'EST-404',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ORTODONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '52',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '30',	alignment: 'center' ,fontSize: 8},{text: 'PRF-100',	alignment: 'center' ,fontSize: 8},{text: 'PROTESIS FIJA I',	alignment: '' ,fontSize: 8},{text: 'EST-307',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PROSTODONCIA FIJA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '62',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '31',	alignment: 'center' ,fontSize: 8},{text: 'PRM-100',	alignment: 'center' ,fontSize: 8},{text: 'PROTESIS REMOVIBLE I',	alignment: '' ,fontSize: 8},{text: 'EST-308',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PROSTODONCIA REMOVIBLE I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '67',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '32',	alignment: 'center' ,fontSize: 8},{text: 'PRP-110',	alignment: 'center' ,fontSize: 8},{text: 'PREVENTIVA Y PERIODONCIA  II',	alignment: '' ,fontSize: 8},{text: 'EST-405',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PERIODONCIA II',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '33',	alignment: 'center' ,fontSize: 8},{text: 'CIB-120',	alignment: 'center' ,fontSize: 8},{text: 'CIRUGIA BUCAL  III',	alignment: '' ,fontSize: 8},{text: 'EST-401',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'CIRUGIA BUCAL II',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '53',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '34',	alignment: 'center' ,fontSize: 8},{text: 'ODP-110',	alignment: 'center' ,fontSize: 8},{text: 'ODONTOPEDIATRIA II',	alignment: '' ,fontSize: 8},{text: 'EST-402',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ODONTOPEDIATRIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '35',	alignment: 'center' ,fontSize: 8},{text: 'OPE-120',	alignment: 'center' ,fontSize: 8},{text: 'OPERATORIA III Y ENDODONCIA II',	alignment: '' ,fontSize: 8},{text: 'EST-403/EST 409',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'OPERATORIA DENTAL II/ENDODONCIA II',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '54',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '36',	alignment: 'center' ,fontSize: 8},{text: 'ORT-110',	alignment: 'center' ,fontSize: 8},{text: 'ORTODONCIA II Y ORTOPEDIA I',	alignment: '' ,fontSize: 8},{text: 'EST-404',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ORTODONCIA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '52',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '37',	alignment: 'center' ,fontSize: 8},{text: 'PRF-110',	alignment: 'center' ,fontSize: 8},{text: 'PROTESIS FIJA II',	alignment: '' ,fontSize: 8},{text: 'EST-307',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PROSTODONCIA FIJA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '62',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '38',	alignment: 'center' ,fontSize: 8},{text: 'PRM-110',	alignment: 'center' ,fontSize: 8},{text: 'PROTESIS REMOVIBLE II',	alignment: '' ,fontSize: 8},{text: 'EST-308',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PROSTODONCIA REMOVIBLE I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '57',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '39',	alignment: 'center' ,fontSize: 8},{text: 'PRP-120',	alignment: 'center' ,fontSize: 8},{text: 'PREVENTIVA Y PERIODONCIA  III',	alignment: '' ,fontSize: 8},{text: 'EST-405',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PERIODONCIA II',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '40',	alignment: 'center' ,fontSize: 8},{text: 'SPU-100',	alignment: 'center' ,fontSize: 8},{text: 'SALUD PUBLICA I',	alignment: '' ,fontSize: 8},{text: 'SLP-202',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ESTOMATOLOGIA SOCIAL PREVENTIVA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '41',	alignment: 'center' ,fontSize: 8},{text: 'PRP-130',	alignment: 'center' ,fontSize: 8},{text: 'PREVENTIVA Y PERIODONCIA  IV',	alignment: '' ,fontSize: 8},{text: 'EST-507',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'PERIODONCIA III',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '53',	alignment: 'center' ,bold: true,fontSize: 8}],
            [ {text: '42',	alignment: 'center' ,fontSize: 8},{text: 'SPU-110',	alignment: 'center' ,fontSize: 8},{text: 'SALUD PUBLICA II',	alignment: '' ,fontSize: 8},{text: 'SLP-202',	alignment: 'center' ,bold: true,fontSize: 8},{text: 'ESTOMATOLOGIA SOCIAL PREVENTIVA I',	alignment: '' ,bold: true,fontSize: 8},{text: '75',	alignment: 'center' ,bold: true,fontSize: 8},{text: '51',	alignment: 'center' ,bold: true,fontSize: 8}],

          ]
        }
      },
      {
        text: [
          {text: '\n\n Emitida por el Vicerectorado Academico a favor de CONDORI DIEGO HIBER con C:I: N 6593404 PT convalidando  42  asignaturas correspondientes al  Plan de  Estudios vigente en la carrera de ODONTOLOGIA (R) de nuestra Universidad.',fontSize: 11,bold: true},
                {text: '\n\n Es dado en la ciudad de Oruro a los 27 dias del mes de abril de año 2022. ',fontSize: 11,bold: true},
  ]
      },
    ],
    styles: {
      header: {
          fonts: 'curier',
        fontSize: 24,
        bold: true,
        alignment: 'right',


      },
      bigger: {
         fonts: 'curier',
        fontSize: 20,
        italics: true,
        alignment: 'right',

      }
    }

  }
  pdfMake.createPdf(dd).open();

}
//#region ANTERIORES BOTONES
  openFormIns()
  {
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
  openCuadroAlumnos(){
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
  openFreeStyle(){
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




  openPdfStyle() {
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

  openPdfStyleDict() {
    const documentDefinition = {
      content: [
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },
        { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] }
      ],

      styles: {
        header: {
          fontSize: 10,
          bold: true
        },
        anotherStyle: {
          fontSize: 100,
          italic: true,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfColumns() {
    const documentDefinition = {
      content: [
        'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'First column'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Second column'
            },
            {
              // fixed width
              width: 100,
              text: 'Third column'
            },
            {
              // percentage width
              width: '10%',
              text: 'Last column'
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        'This paragraph goes below all columns and has full width'
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfTables() {
    const documentDefinition = {
      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfLists() {
    const documentDefinition = {
      content: [
        'Bulleted list example:',
        {
          // to treat a paragraph as a bulleted list, set an array of items under the ul key
          ul: [
            'Item 1',
            'Item 2',
            'Item 3',
            { text: 'Item 4', bold: true },
          ]
        },

        'Numbered list example:',
        {
          // for numbered lists set the ol key
          ol: [
            'Item 1',
            'Item 2',
            'Item 3'
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfHeadersAndFootersStatic() {
    const documentDefinition = {
      header: 'simple text',

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      content: 'This is an sample PDF printed with pdfMake'
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfHeadersAndFootersDynamic() {
    const documentDefinition = {
      footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
      header: function (currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element

        return { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' };
      },
      content: 'This is an sample PDF printed with pdfMake'
    };

    pdfMake.createPdf(documentDefinition).open();

  }

  openPdfBackgroundLayer() {
    // The background-layer will be added on every page.
    var documentDefinition = {
      // background: 'simple text',
      background: function (currentPage) {
        return 'simple text on page ' + currentPage
      },
      content: 'This is an sample PDF printed with pdfMake'
    };
    pdfMake.createPdf(documentDefinition).open();

  }

  openPdfMargins() {
    const documentDefinition = {
      content: [
        'This is a standard paragraph, using default style',

        // margin: [left, top, right, bottom]
        { text: 'sample', margin: [5, 2, 10, 20] },

        // margin: [horizontal, vertical]
        { text: 'another text', margin: [5, 2] },

        // margin: equalLeftTopRightBottom
        { text: 'last one', margin: 5 }

      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }


  openPdfStackOfParagrahps() {
    var documentDefinition = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
          columns: [
            'first column is a simple text',
            {
              stack: [
                // second column consists of paragraphs
                'paragraph A',
                'paragraph B',
                'these paragraphs will be rendered one below another inside the column'
              ],
              fontSize: 15
            }
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfImages() {
    // JPEG and PNG formats are supported.
    var documentDefinition = {
      content: [
        {
          // you'll most often use dataURI images on the browser side
          // if no width/height/fit is provided, the original size will be used
          image: this.logoDataUrl
        },

        //{
        // under NodeJS (or in case you use virtual file system provided by pdfmake)
        // you can also pass file names here
        //  image: 'myImageDictionary/image1.jpg'
        //}
      ],

      images: {
        mySuperImage: 'data:image/jpeg;base64,...content...'
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfSVGs() {
    var documentDefinition = {
      content: [
        {
          // If no width/height/fit is used, then dimensions from the svg element is used.
          svg: '<svg width="300" height="200" viewBox="0 0 300 200">' +
            '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' +
            '</svg>'
        },
        {
          // if you specify width, svg will scale proportionally
          svg: '<svg width="300" height="200" viewBox="0 0 300 200">' +
            '  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />' +
            '</svg>',
          width: 150
        },
        {
          // if you specify both width and height - svg will be stretched
          svg: '<svg width="300" height="200" viewBox="0 0 300 200">' +
            '  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />' +
            '</svg>',
          width: 60,
          height: 40
        },
        {
          // you can also fit the svg inside a rectangle
          svg: '<svg																																																								' +
            '   xmlns:dc="http://purl.org/dc/elements/1.1/"                                                                                                                                                                                    ' +
            '   xmlns:cc="http://creativecommons.org/ns#"                                                                                                                                                                                      ' +
            '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"                                                                                                                                                                        ' +
            '   xmlns:svg="http://www.w3.org/2000/svg"                                                                                                                                                                                         ' +
            '   xmlns="http://www.w3.org/2000/svg"                                                                                                                                                                                             ' +
            '   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"                                                                                                                                                            ' +
            '   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"                                                                                                                                                                   ' +
            '   width="210mm"                                                                                                                                                                                                                  ' +
            '   height="297mm"                                                                                                                                                                                                                 ' +
            '   viewBox="0 0 210 297"                                                                                                                                                                                                          ' +
            '   version="1.1"                                                                                                                                                                                                                  ' +
            '   id="svg670"                                                                                                                                                                                                                    ' +
            '   inkscape:version="0.92.4 (5da689c313, 2019-01-14)"                                                                                                                                                                             ' +
            '   sodipodi:docname="Configuracion 1.svg">                                                                                                                                                                                        ' +
            '  <defs                                                                                                                                                                                                                           ' +
            '     id="defs664" />                                                                                                                                                                                                              ' +
            '  <sodipodi:namedview                                                                                                                                                                                                             ' +
            '     id="base"                                                                                                                                                                                                                    ' +
            '     pagecolor="#ffffff"                                                                                                                                                                                                          ' +
            '     bordercolor="#666666"                                                                                                                                                                                                        ' +
            '     borderopacity="1.0"                                                                                                                                                                                                          ' +
            '     inkscape:pageopacity="0.0"                                                                                                                                                                                                   ' +
            '     inkscape:pageshadow="2"                                                                                                                                                                                                      ' +
            '     inkscape:zoom="0.98994949"                                                                                                                                                                                                   ' +
            '     inkscape:cx="600.27706"                                                                                                                                                                                                      ' +
            '     inkscape:cy="510.19682"                                                                                                                                                                                                      ' +
            '     inkscape:document-units="mm"                                                                                                                                                                                                 ' +
            '     inkscape:current-layer="layer1"                                                                                                                                                                                              ' +
            '     showgrid="false"                                                                                                                                                                                                             ' +
            '     inkscape:window-width="1920"                                                                                                                                                                                                 ' +
            '     inkscape:window-height="1017"                                                                                                                                                                                                ' +
            '     inkscape:window-x="-8"                                                                                                                                                                                                       ' +
            '     inkscape:window-y="-8"                                                                                                                                                                                                       ' +
            '     inkscape:window-maximized="1" />                                                                                                                                                                                             ' +
            '  <metadata                                                                                                                                                                                                                       ' +
            '     id="metadata667">                                                                                                                                                                                                            ' +
            '    <rdf:RDF>                                                                                                                                                                                                                     ' +
            '      <cc:Work                                                                                                                                                                                                                    ' +
            '         rdf:about="">                                                                                                                                                                                                            ' +
            '        <dc:format>image/svg+xml</dc:format>                                                                                                                                                                                      ' +
            '        <dc:type                                                                                                                                                                                                                  ' +
            '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />                                                                                                                                                               ' +
            '        <dc:title />                                                                                                                                                                                                              ' +
            '      </cc:Work>                                                                                                                                                                                                                  ' +
            '    </rdf:RDF>                                                                                                                                                                                                                    ' +
            '  </metadata>                                                                                                                                                                                                                     ' +
            '  <g                                                                                                                                                                                                                              ' +
            '     inkscape:label="Capa 1"                                                                                                                                                                                                      ' +
            '     inkscape:groupmode="layer"                                                                                                                                                                                                   ' +
            '     id="layer1">                                                                                                                                                                                                                 ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="68.262619"                                                                                                                                                                                                              ' +
            '       y="248.11998"                                                                                                                                                                                                              ' +
            '       id="text363"><tspan                                                                                                                                                                                                        ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan361"                                                                                                                                                                                                            ' +
            '         x="68.262619"                                                                                                                                                                                                            ' +
            '         y="248.11998"                                                                                                                                                                                                            ' +
            '         style="stroke-width:0.26458332">Configuración 1</tspan></text>                                                                                                                                                           ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect338"                                                                                                                                                                                                               ' +
            '       width="0.26726952"                                                                                                                                                                                                         ' +
            '       height="3.4745038"                                                                                                                                                                                                         ' +
            '       x="46.122608"                                                                                                                                                                                                              ' +
            '       y="55.930874"                                                                                                                                                                                                              ' +
            '       ry="0.13363476"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect355"                                                                                                                                                                                                               ' +
            '       width="73.23185"                                                                                                                                                                                                           ' +
            '       height="4.543582"                                                                                                                                                                                                          ' +
            '       x="57.080658"                                                                                                                                                                                                              ' +
            '       y="50.318211"                                                                                                                                                                                                              ' +
            '       ry="0.13363469"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="170.2981"                                                                                                                                                                                                               ' +
            '       y="56.684345"                                                                                                                                                                                                              ' +
            '       id="text359"><tspan                                                                                                                                                                                                        ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan357"                                                                                                                                                                                                            ' +
            '         x="170.2981"                                                                                                                                                                                                             ' +
            '         y="56.684345"                                                                                                                                                                                                            ' +
            '         style="stroke-width:0.26458332">Eje 1</tspan></text>                                                                                                                                                                     ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5"                                                                                                                                                                                                         ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="34.983921"                                                                                                                                                                                                              ' +
            '       y="35.047993"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="44.412098"                                                                                                                                                                                                              ' +
            '       y="55.449795"                                                                                                                                                                                                              ' +
            '       id="text2203"><tspan                                                                                                                                                                                                       ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201"                                                                                                                                                                                                           ' +
            '         x="44.412098"                                                                                                                                                                                                            ' +
            '         y="55.449795"                                                                                                                                                                                                            ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">1</tspan></text>                                                                                                                                                            ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5-1"                                                                                                                                                                                                       ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="124.04748"                                                                                                                                                                                                              ' +
            '       y="33.362591"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="133.46629"                                                                                                                                                                                                              ' +
            '       y="53.32761"                                                                                                                                                                                                               ' +
            '       id="text2203-1"><tspan                                                                                                                                                                                                     ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201-5"                                                                                                                                                                                                         ' +
            '         x="133.46629"                                                                                                                                                                                                            ' +
            '         y="53.32761"                                                                                                                                                                                                             ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">2</tspan></text>                                                                                                                                                            ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect338-3"                                                                                                                                                                                                             ' +
            '       width="0.26726952"                                                                                                                                                                                                         ' +
            '       height="3.4745038"                                                                                                                                                                                                         ' +
            '       x="46.122612"                                                                                                                                                                                                              ' +
            '       y="114.4629"                                                                                                                                                                                                               ' +
            '       ry="0.13363476"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect355-1"                                                                                                                                                                                                             ' +
            '       width="73.23185"                                                                                                                                                                                                           ' +
            '       height="4.543582"                                                                                                                                                                                                          ' +
            '       x="57.080666"                                                                                                                                                                                                              ' +
            '       y="108.85025"                                                                                                                                                                                                              ' +
            '       ry="0.13363469"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="170.29808"                                                                                                                                                                                                              ' +
            '       y="115.21637"                                                                                                                                                                                                              ' +
            '       id="text359-8"><tspan                                                                                                                                                                                                      ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan357-8"                                                                                                                                                                                                          ' +
            '         x="170.29808"                                                                                                                                                                                                            ' +
            '         y="115.21637"                                                                                                                                                                                                            ' +
            '         style="stroke-width:0.26458332">Eje 2</tspan></text>                                                                                                                                                                     ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5-7"                                                                                                                                                                                                       ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="34.696865"                                                                                                                                                                                                              ' +
            '       y="93.579323"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="44.412102"                                                                                                                                                                                                              ' +
            '       y="113.98182"                                                                                                                                                                                                              ' +
            '       id="text2203-9"><tspan                                                                                                                                                                                                     ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201-8"                                                                                                                                                                                                         ' +
            '         x="44.412102"                                                                                                                                                                                                            ' +
            '         y="113.98182"                                                                                                                                                                                                            ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">3</tspan></text>                                                                                                                                                            ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5-1-1"                                                                                                                                                                                                     ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="123.76041"                                                                                                                                                                                                              ' +
            '       y="91.893921"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="133.46629"                                                                                                                                                                                                              ' +
            '       y="111.85963"                                                                                                                                                                                                              ' +
            '       id="text2203-1-1"><tspan                                                                                                                                                                                                   ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201-5-0"                                                                                                                                                                                                       ' +
            '         x="133.46629"                                                                                                                                                                                                            ' +
            '         y="111.85963"                                                                                                                                                                                                            ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">4</tspan></text>                                                                                                                                                            ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect338-6"                                                                                                                                                                                                             ' +
            '       width="0.26726952"                                                                                                                                                                                                         ' +
            '       height="3.4745038"                                                                                                                                                                                                         ' +
            '       x="45.855339"                                                                                                                                                                                                              ' +
            '       y="172.19312"                                                                                                                                                                                                              ' +
            '       ry="0.13363476"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect355-0"                                                                                                                                                                                                             ' +
            '       width="73.23185"                                                                                                                                                                                                           ' +
            '       height="4.543582"                                                                                                                                                                                                          ' +
            '       x="56.813385"                                                                                                                                                                                                              ' +
            '       y="166.58044"                                                                                                                                                                                                              ' +
            '       ry="0.13363469"                                                                                                                                                                                                            ' +
            '       style="stroke-width:0.26458332" />                                                                                                                                                                                         ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="170.03084"                                                                                                                                                                                                              ' +
            '       y="172.94659"                                                                                                                                                                                                              ' +
            '       id="text359-4"><tspan                                                                                                                                                                                                      ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan357-1"                                                                                                                                                                                                          ' +
            '         x="170.03084"                                                                                                                                                                                                            ' +
            '         y="172.94659"                                                                                                                                                                                                            ' +
            '         style="stroke-width:0.26458332">Eje 3</tspan></text>                                                                                                                                                                     ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5-4"                                                                                                                                                                                                       ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="34.146465"                                                                                                                                                                                                              ' +
            '       y="151.30753"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="44.144829"                                                                                                                                                                                                              ' +
            '       y="171.71204"                                                                                                                                                                                                              ' +
            '       id="text2203-5"><tspan                                                                                                                                                                                                     ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201-2"                                                                                                                                                                                                         ' +
            '         x="44.144829"                                                                                                                                                                                                            ' +
            '         y="171.71204"                                                                                                                                                                                                            ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">5</tspan></text>                                                                                                                                                            ' +
            '    <rect                                                                                                                                                                                                                         ' +
            '       id="rect336-6-2-5-1-4"                                                                                                                                                                                                     ' +
            '       width="23.576702"                                                                                                                                                                                                          ' +
            '       height="35.779388"                                                                                                                                                                                                         ' +
            '       x="123.21003"                                                                                                                                                                                                              ' +
            '       y="149.62213"                                                                                                                                                                                                              ' +
            '       style="stroke-width:0.33957967"                                                                                                                                                                                            ' +
            '       ry="8.1385536"                                                                                                                                                                                                             ' +
            '       transform="rotate(-0.28099868)"                                                                                                                                                                                            ' +
            '       rx="3.7425721" />                                                                                                                                                                                                          ' +
            '    <text                                                                                                                                                                                                                         ' +
            '       xml:space="preserve"                                                                                                                                                                                                       ' +
            '       style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"           ' +
            '       x="133.19904"                                                                                                                                                                                                              ' +
            '       y="169.58984"                                                                                                                                                                                                              ' +
            '       id="text2203-1-7"><tspan                                                                                                                                                                                                   ' +
            '         sodipodi:role="line"                                                                                                                                                                                                     ' +
            '         id="tspan2201-5-1"                                                                                                                                                                                                       ' +
            '         x="133.19904"                                                                                                                                                                                                            ' +
            '         y="169.58984"                                                                                                                                                                                                            ' +
            '         style="fill:#ffffff;stroke-width:0.26458332">6</tspan></text>                                                                                                                                                            ' +
            '  </g>                                                                                                                                                                                                                            ' +
            '</svg>                                                                                                                                                                                                                            ',
          fit: [60, 40]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }
//#endregion ANTERIORES BOTONES
}
