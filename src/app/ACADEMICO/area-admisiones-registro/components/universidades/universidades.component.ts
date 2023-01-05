import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { UniversidadesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/universidades.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrls: ['./universidades.component.css']
})
export class UniversidadesComponent implements OnInit {

  ruta;
  constructor(protected _uni: UniversidadesService) { }
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarUniversidades();
  }
  uni =[ ];
  UniversidadesSeleccionado = {
    id_univ:'',
    nombre_univ:'',
    sigla_univ:'',
  };

  newUniversidades= new FormGroup({
    // ejemplo: id_univ:new FormControl(''),
    // id_univ:new FormControl(''),
    nombre_univ:new FormControl(''),
    sigla_univ:new FormControl(''),
  });

  SeleccionarUniversidades(id,Modo){
    this._uni.SeleccionarUniversidades(id)
    .then(res => {
      var a = res.data;
      this.UniversidadesSeleccionado = a;
      console.log('INFO DATO SELECCIONADO',this.UniversidadesSeleccionado);
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
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarUniversidades(){
    this._uni.ObtenerUniversidades()
    .then(res => {
      console.log(res.data);
      this.uni = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }

  AgregarUniversidades(){
    const formData = new FormData();
    //ejemplo formData.append('atributo',this.newUniversidades.value.atributo);

    // formData.append('id_univ',this.newUniversidades.value.id_univ);
    formData.append('nombre_univ',this.newUniversidades.value.nombre_univ);
    formData.append('sigla_univ',this.newUniversidades.value.sigla_univ);
    this._uni.AgregarUniversidades(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarUniversidades();
    })
    .catch(error=>{
      console.log('ERROR AL INTENTAR AÑADIR DATO');
      console.log(error);
    })
  }

  ModificarUniversidades(Universidades){
    const formData = new FormData();
    //ejemplo... formData.append('id',this.newUniversidades.value.id);
     formData.append('id_univ',Universidades.id_univ);
     formData.append('nombre_univ',Universidades.nombre_univ);
     formData.append('sigla_univ',Universidades.sigla_univ);
     this._uni.ModificarUniversidades(formData,Universidades.id_univ)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarUniversidades();
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      console.log(error);
      this.CargarUniversidades();
    })
  }
  EliminarUniversidades(id){
    this._uni.EliminarUniversidades(id)
    .then(res => {
      console.log(res.data);
      this.CargarUniversidades();
    }).catch(error =>  {
    console.log("err",error);
    });
  }

  LimpiarUniversidades()
  {
  this.UniversidadesSeleccionado = {
    // ejemplo: id_univ:'',
    id_univ:'',
    nombre_univ:'',
    sigla_univ:'',

  };
  this.newUniversidades.patchValue({
    // ejemplo: id_univ:'',
    id_univ:'',
    nombre_univ:'',
    sigla_univ:'',
  })
 }


}
