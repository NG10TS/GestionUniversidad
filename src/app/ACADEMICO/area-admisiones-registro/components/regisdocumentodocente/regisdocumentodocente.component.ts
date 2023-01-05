import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { RegisdocumentodocenteService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/regisdocumentodocente.service';


@Component({
  selector: 'app-regisdocumentodocente',
  templateUrl: './regisdocumentodocente.component.html',
  styleUrls: ['./regisdocumentodocente.component.css']
})
export class regisdocumentodocenteComponent implements OnInit {

    ruta = 'http://localhost:8000/';
    reg=[];
    est=[];
    carre=[];
    newRegisdocumentodocente = new FormGroup({
      // id_reg_docum_doc:new FormControl(''),
      nro_registro_doc:new FormControl(''),//
      documen_doc:new FormControl(''),
      tipo_documen_doc :new FormControl(''),
      id_doc:new FormControl(''),
      id_carre:new FormControl(''),
    });
    RegisdocumentodocenteSeleccionado = {
     id_reg_docum_doc:'',
     nro_registro_doc:'',
     documen_doc:'',
     tipo_documen_doc :'',
     id_doc:'',
     id_carre:'',
    }
    constructor(protected _regisDocdoc:RegisdocumentodocenteService,
      protected _doc: DocentesService,protected _carr: CarrerasService
    ) { }

    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarRegisdocumentodocentes();
      this.CargarCarreras();
      this.CargarDocentes();

    }
    LimpiarRegisdocumentodocentes(){
      this.RegisdocumentodocenteSeleccionado = {
        id_reg_docum_doc:'',
        nro_registro_doc:'',
        documen_doc:'',
        tipo_documen_doc :'',
        id_doc:'',
        id_carre:'',
      };
      this.newRegisdocumentodocente.patchValue({
        id_reg_docum_doc:'',
        nro_registro_doc:'',
        documen_doc:'',
        tipo_documen_doc :'',
        id_doc:'',
        id_carre:'',
      })
     }

    CargarRegisdocumentodocentes(){
      this._regisDocdoc.Obtenerregisdocumentodocentes()
      .then(res => {
        console.log(res.data);
        this.reg = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarDocentes(){
      this._doc.ObtenerDocentes()
      .then(res => {
        console.log(res.data);
        this.est = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarCarreras(){
      this._carr.ObtenerCarreras()
      .then(res => {
        console.log(res.data);
        this.carre = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    AgregarRegisdocumentodocente(){
      const formData = new FormData();
      formData.append('nro_registro_doc',this.newRegisdocumentodocente.value.nro_registro_doc);
      formData.append('documen_doc',this.newRegisdocumentodocente.value.documen_doc);
      formData.append('tipo_documen_doc',this.newRegisdocumentodocente.value.tipo_documen_doc);
      formData.append('id_doc',this.newRegisdocumentodocente.value.id_doc);
      formData.append('id_carre',this.newRegisdocumentodocente.value.id_carre);
      this._regisDocdoc.Agregarregisdocumentodocente(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarRegisdocumentodocentes();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error);
      })
    }

    SeleccionarRegisdocumentodocente(id,Modo){
      this._regisDocdoc.Seleccionarregisdocumentodocente(id)
      .then(res => {
        var a = res.data;
        this.RegisdocumentodocenteSeleccionado = a;
        console.log('INFO EST SELECCIONADO',this.RegisdocumentodocenteSeleccionado);
        switch (Modo) {
          case 'Editar':
            document.getElementById("btnOpenModalMod").click();
            break;
          case 'Mostrar':
            document.getElementById("btnOpenModalMos").click();
            break;
          default:
            break;
        }
      }).catch(err =>  {
      console.log("err");
      });

    }
    ModificarRegisdocumentodocente(Regisdocumentodocente){
      console.log('DATOS A ACTUALIZAR',Regisdocumentodocente)
      const formData = new FormData();
      formData.append('id_reg_docum_doc',Regisdocumentodocente.id_reg_docum_doc);
      formData.append('nro_registro_doc',Regisdocumentodocente.nro_registro_doc);
      formData.append('documen_doc',Regisdocumentodocente.documen_doc);
      formData.append('tipo_documen_doc',Regisdocumentodocente.tipo_documen_doc);
      formData.append('id_doc',Regisdocumentodocente.id_doc);
      formData.append('id_carre',Regisdocumentodocente.id_carre);
      this._regisDocdoc.Modificarregisdocumentodocente(formData,Regisdocumentodocente.id_reg_docum_doc)
      .then(res=>{
        console.log('SE MODIFICO CORRECTAMENTE');
        console.log(res);
        this.CargarRegisdocumentodocentes();
      })
      .catch(error=>{
        console.log('HAY ERROR AL MODIFICAR');
        console.log(error);
        this.CargarRegisdocumentodocentes();
      })
    }
    EliminarRegisdocumentodocente(id){
      this._regisDocdoc.Eliminarregisdocumentodocente(id)
      .then(res => {
        console.log(res.data);
        this.CargarRegisdocumentodocentes();
      }).catch(err =>  {
      console.log("err");
      });
    }
  }

