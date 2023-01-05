import { ApisService } from 'src/app/core/services/Apis.service';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class InscritosProgramaService {

  ruta=environment.service;
    constructor(protected _sql:ApisService) { }
    ObtenerInscritosPrograma(){
      return axios.get(this.ruta+'api/InscritosPrograma/');
    }
    AgregarInscritosPrograma(InscritosPrograma){
      return axios.post(this.ruta+'api/InscritosPrograma/',InscritosPrograma);
    }
    ModificarInscritosPrograma(InscritosPrograma, id){
      return axios.post(this.ruta+'api/updateIncritosPrograma/'+id,InscritosPrograma);
    }
    SeleccionarInscritosPrograma(id){
      return axios.get(this.ruta+'api/InscritosPrograma/'+id);
    }
    EliminarInscritosPrograma(id){
      return axios.delete(this.ruta+'api/InscritosPrograma/'+id);
    }
    AutenticarInscritosPrograma(data){
      return axios.post(this.ruta+'api/InscritosProgramaAuth/',data);
    }

    ObtenerProgramasEstudiante(idEst:number){
      return axios.get(this.ruta+'api/getProgramaEstudiante/'+idEst);
    }
    ObtenerModulosEstudiante(idEst:number){
      return axios.get(this.ruta+'api/getModulosEstudiante/'+idEst);
    }

    GenerarListaIncritosPostgradoPDF(){
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
          var body1=[]
          for(var key in headers){
            if (headers.hasOwnProperty(key)) {
              var header = headers[key]
              var row = new Array();
              row.push(header.col_0); //0
              row.push(header.col_1); //1
              row.push(header.col_2); //2
              body1.push(row);
            }
          }
          var rows = datos;
          console.log("CONJUNTO DE DATOS ES", rows)

          var contador = 0;
          for(var key in rows){
            if (rows.hasOwnProperty(key)) {
              var a = rows[key]
              var fila = new Array();
              contador= contador+1;
              fila.push(contador); //0
              fila.push({ text: a.ape_p_est.toString() +' '+ a.ape_m_est.toString()+' ' + (a.nombre_est.toString()==null)?'':a.nombre_est.toString()}); //1
              fila.push({ text: a.ci_est.toString()}); //2
              body1.push(fila);
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
                  body: body1
                }
              },

            ],

          }
          pdfMake.createPdf(dd).open();
        })

    }
    GenerarHojaInscripcionPDF(data){
      console.log('DATOS RECEPCIONADOS',data)
      // var data=_sql
      var dd = {
        header: function (currentPage, pageCount) {
          //,left,updown,nose
          return 	{
        style: 'tableExample',
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            ['One value goes here', 'Another one here', { text: 'Pagina '+ currentPage.toString() + ' de ' + pageCount, alignment: 'right', fontSize: 8 }]
          ]
        }
      }
        },

        pageMargins: [ 20, 10, 10 ,10],
        pageOrientation: '',
        pageSize: 'LETTER',
        content: [
          // {text:'1. DATOS PERSONALES DEL ESTUDIANTE/DOCENTE/ADMINISTRATIVO',padding:10},
          {
            text:'\t\t\t\t\t1. DATOS PERSONALES DEL ESTUDIANTE/DOCENTE/ADMINISTRATIVO\t\t\t\t\t',
            bold: true,
            fontSize: 16,
            background: 'black',
            color: 'white',
            widhth:120,
          },
          {
            columns: [
              {
                width: 120,
                text: 'Apellido Paterno:'
              },
              {
                width: 150,
                text: data.ape_p_ins
              },
              {
                width: 140,
                text: 'Fecha de Nacimiento'
              },
              {
                width: 120,
                text: '04/07/2022'
              }
            ],
          },
          {
            columns: [
              {
                width: 120,
                text: 'Apellido Materno:'
              },
              {
                width: 150,
                text: data.ape_m_ins
              },
              {
                width: 140,
                text: 'Edad'
              },
              {
                width: 120,
                text: '22'
              }
            ],
          },
          {
            columns: [
              {
                width: 120,
                text: 'Nombre:'
              },
              {
                width: 150,
                text: data.nombre_ins
              },
            ],
          },
          {
            columns: [
              {
                width: 120,
                text: 'Direccion:'
              },
              {
                width: '*',
                text: data.nombre_ins
              },
            ],
          },
          {
            columns: [
              {
                width: 120,
                text: 'Telefono:'
              },
              {
                width: 150,
                text: data.telf_domicilio
              },
              {
                width: 140,
                text: 'Celular'
              },
              {
                width: 120,
                text: data.telf_movil
              }
            ],
          },
          {
            text:'\t\t\t\t\t2. DATOS DEL TRABAJO\t\t\t\t\t',
            bold: true,
            fontSize: 16,
            background: 'black',
            color: 'white',
            widhth:120,
          },
          {
            columns: [
              {
                width: 270,
                text: 'Empresa o institucion donde trabaja:'
              },
              {
                width: '*',
                text: 'COP NAME NAME'
              },
            ],
          },
          {
            columns: [
              {
                width: 270,
                text: 'Direccion del trabajo'
              },
              {
                width: '*',
                text: 'Av. del Minero s/n lado Archivo Histórico COMIBOL'
              },
            ],
          },
          {
            columns: [
              {
                width: 270,
                text: 'Telfono del trabajo:'
              },
              {
                width: '*',
                text: '52 31241'
              },
            ],
          },
          {
            text:'\t\t\t\t3. INFORMACION PROFESIONAL\t\t\t\t',
            bold: true,
            fontSize: 16,
            background: 'black',
            color: 'white',
            widhth:120,
          },
          {
            columns: [
              {
                width: 270,
                text: 'Forma de pago elegida'
              },
              {
                width: '*',
                text: 'CONTADO'
              },
            ],
          },
          {text:'Este formulario tiene el carácter de declaración jurada, por esta razón debe ser llenada correctamente en los puntos necesarios. Al enviar y aceptar este formulario me comprometo a pagar el total del programa de postgrado en las fechas acordadas en absoluta puntualidad y responsabilidad.'}
        ],

      }
      pdfMake.createPdf(dd).open();
    }
}
