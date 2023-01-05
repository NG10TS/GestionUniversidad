import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FacultadesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/facultades.service';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.css']
})
export class FacultadesComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  fac=[];

  newFacultad = new FormGroup({
    desc_facu:new FormControl(''),//
    habi_facu:new FormControl(''),
    ubica_facu:new FormControl(''),
    ape_m_est:new FormControl(''),
  });
  FacultadSeleccionado = {
    id_facu:'',
    desc_facu:'',
    habi_facu:'',
    ubica_facu:'',
    ape_m_est:'',
  }
  constructor(protected _facu: FacultadesService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarFacultads();
  }
  LimpiarFacultads(){
    this.FacultadSeleccionado = {
      id_facu:'',
      desc_facu:'',
      habi_facu:'',
      ubica_facu:'',
      ape_m_est:'',
    };
    this.newFacultad.patchValue({
      id_facu:'',
      desc_facu:'',
      habi_facu:'',
      ubica_facu:'',
      ape_m_est:'',
    })
   }

  CargarFacultads(){
    this._facu.ObtenerFacultades()
    .then(res => {
      console.log(res.data);
      this.fac = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarFacultad(){
      const formData = new FormData();
      formData.append('desc_facu',this.newFacultad.value.desc_facu); //NOMBRE
      formData.append('habi_facu',this.newFacultad.value.habi_facu); //SIGLA
      formData.append('ubica_facu',this.newFacultad.value.ubica_facu); //UBICACION
      this._facu.AgregarFacultad(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarFacultads();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error,error);
      })
  }

  SeleccionarFacultad(id,Modo){
    this._facu.SeleccionarFacultad(id)
    .then(res => {
      var a = res.data;
      this.FacultadSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.FacultadSeleccionado);
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
    console.log("err",err);
    });
  }

  ModificarFacultad(Facultad){
    console.log('DATO A ACTUALIZAR',Facultad)
    let data = {
      id_facu:Facultad.id_facu,
      desc_facu:Facultad.desc_facu,
      habi_facu:Facultad.habi_facu,
      ubica_facu:Facultad.ubica_facu,
    };
    this._facu.ModificarFacultad(data, Facultad.id_facu)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarFacultads();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error,error);
    })
  }
  EliminarFacultad(id){
    this._facu.EliminarFacultad(id)
    .then(res => {
      console.log(res.data);
      this.CargarFacultads();
    }).catch(err =>  {
    console.log("err",err);
    });

  }
}
