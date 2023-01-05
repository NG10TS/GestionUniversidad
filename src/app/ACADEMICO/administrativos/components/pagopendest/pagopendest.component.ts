import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MateriaspendientesService } from 'src/app/core/services/ACADEMICO/administrativos/Materiaspendientes.service';
import { PagopendestService } from 'src/app/core/services/ACADEMICO/administrativos/Pagopendest.service';
import { PagopendientesService } from 'src/app/core/services/ACADEMICO/administrativos/Pagopendientes.service';

@Component({
  selector: 'app-pagopendest',
  templateUrl: './pagopendest.component.html',
  styleUrls: ['./pagopendest.component.css']
})
export class PagopendestComponent implements OnInit {

  constructor(protected  _pagopendest: PagopendestService, protected _tipopago:PagopendientesService, protected _matpend:MateriaspendientesService,
    // protected _estreg: EstudianteregulaService
    ) { }
tipopago=[];
matpend=[];
estreg=[];
    ruta = 'http://localhost:8000/';
    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarPagopendest();  
      this.CargarMateriaspendientes();
      this.CargarPagopendientes();
      //this.CargarEstudiantesregulares();    
    }
//CRUD V3: idPK=> id_pago_pend_est, nomService=> _pagopendest, nombreCRUD=> Pagopendest,  dataP=> pagopendest, isSubmitted=>isSubmitted
  pagopendest=[];
  isSubmitted = false;
  newPagopendest =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_pago_pend_est:new FormControl(0),
    id_tipo_pago_opend:new FormControl(''),
    id_est_reg:new FormControl(''),
    id_mat_pend:new FormControl(''),
    estado_pago_pend:new FormControl(''),
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
  CargarMateriaspendientes(){
    this._matpend.ObtenerMateriaspendientes()
    .then(res => {
      console.log('Materiaspendientes CARGADO',res.data);
      this.matpend = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Materiaspendientes',err.response.data.message);
    });
  }
//   CargarEstudiantesregulares(){
//     this._estreg.ObtenerEstudiantesregulares()
//     .then(res => {
//       console.log('Estudiantesregulares CARGADO',res.data);
//       this.estreg = res.data;
//     }).catch(err =>  {
//     console.log('ERROR AL CARGAR Estudiantesregulares',err.response.data.message);
//     });
//   }
  CargarPagopendest(){
    this._pagopendest.ObtenerPagopendest()
    .then(res => {
      console.log('Pagopendest CARGADO',res.data);
      this.pagopendest = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Pagopendest',err.response.data.message);
    });
  }
  resetPagopendest(){
    this.newPagopendest.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPagopendest(){
    this.isSubmitted=true;
    if (this.newPagopendest.invalid) {
      return;
    } else {
      let id = this.newPagopendest.controls.id_pago_pend_est.value;
      console.log(this.newPagopendest.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._pagopendest.AgregarPagopendest(this.newPagopendest.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Pagopendest',res.data);
          this.CargarPagopendest();
          this.resetPagopendest();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Pagopendest');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._pagopendest.ModificarPagopendest(this.newPagopendest.value,this.newPagopendest.value.id_pago_pend_est)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Pagopendest',res.data);
          this.CargarPagopendest();
          this.resetPagopendest();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Pagopendest');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPagopendest(id){
    if(id){
      const dataPagopendest = this.pagopendest.find(x => x.id_pago_pend_est === id)
      if(!dataPagopendest) return;
      this._pagopendest.SeleccionarPagopendest(id)
      .then(res=>{
        Object.keys(this.newPagopendest.controls).forEach(key => {
          this.newPagopendest.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Pagopendest EXITOSA',this.newPagopendest.value);
          document.getElementById("btnCrudPagopendest").click();
      });
    }
  }
  EliminarPagopendest(id){
    this._pagopendest.EliminarPagopendest(id)
    .then(res => {
      console.log(res.data);
      this.CargarPagopendest();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Pagopendest',err.response.data.message);
    });
}
}
