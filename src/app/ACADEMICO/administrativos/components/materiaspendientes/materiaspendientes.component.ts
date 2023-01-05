import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MateriaspendientesService } from 'src/app/core/services/ACADEMICO/administrativos/Materiaspendientes.service';
import { PagopendientesService } from 'src/app/core/services/ACADEMICO/administrativos/Pagopendientes.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';

@Component({
  selector: 'app-materiaspendientes',
  templateUrl: './materiaspendientes.component.html',
  styleUrls: ['./materiaspendientes.component.css']
})
export class MateriaspendientesComponent implements OnInit {

  constructor(protected  _matpend: MateriaspendientesService, protected _tipopago:PagopendientesService, protected _mat:MateriasService) { }
tipopago=[];
mat=[];

ruta = 'http://localhost:8000/';
ngOnInit(): void {
  let rootVar = window['rutacion'];
  this.ruta = rootVar;
  this.CargarMateriaspendientes();  
  this.CargarPagopendientes(); 
  this.CargarMateria();   
}
//CRUD V3: idPK=> id_mat_pend, nomService=> _matpend, nombreCRUD=> Materiaspendientes,  dataP=> matpend, isSubmitted=>isSubmitted
  matpend=[];
  isSubmitted = false;
  newMateriaspendientes =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_mat_pend:new FormControl(0),
    id_tipo_pago_pend:new FormControl(''),
    id_materia:new FormControl(''),
    fec_mat_pent:new FormControl(''),
  })
  CargarPagopendientes(){
    this._tipopago.ObtenerPagopendientes()
    .then(res => {
      console.log('Pagopendientes CARGADO',res.data);
      this.tipopago = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Pagopendientes',err.response.data.message);
    });
  }
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarMateriaspendientes(){
    this._matpend.ObtenerMateriaspendientes()
    .then(res => {
      console.log('Materiaspendientes CARGADO',res.data);
      this.matpend = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Materiaspendientes',err.response.data.message);
    });
  }
  resetMateriaspendientes(){
    this.newMateriaspendientes.reset();
    this.isSubmitted =false;
  }
  AgregarModificarMateriaspendientes(){
    this.isSubmitted=true;
    if (this.newMateriaspendientes.invalid) {
      return;
    } else {
      let id = this.newMateriaspendientes.controls.id_mat_pend.value;
      console.log(this.newMateriaspendientes.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._matpend.AgregarMateriaspendientes(this.newMateriaspendientes.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Materiaspendientes',res.data);
          this.CargarMateriaspendientes();
          this.resetMateriaspendientes();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Materiaspendientes');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._matpend.ModificarMateriaspendientes(this.newMateriaspendientes.value,this.newMateriaspendientes.value.id_mat_pend)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Materiaspendientes',res.data);
          this.CargarMateriaspendientes();
          this.resetMateriaspendientes();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Materiaspendientes');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarMateriaspendientes(id){
    if(id){
      const dataMateriaspendientes = this.matpend.find(x => x.id_mat_pend === id)
      if(!dataMateriaspendientes) return;
      this._matpend.SeleccionarMateriaspendientes(id)
      .then(res=>{
        Object.keys(this.newMateriaspendientes.controls).forEach(key => {
          this.newMateriaspendientes.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Materiaspendientes EXITOSA',this.newMateriaspendientes.value);
          document.getElementById("btnCrudMateriaspendientes").click();
      });
    }
  }
  EliminarMateriaspendientes(id){
    this._matpend.EliminarMateriaspendientes(id)
    .then(res => {
      console.log(res.data);
      this.CargarMateriaspendientes();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Materiaspendientes',err.response.data.message);
    });
}
}
