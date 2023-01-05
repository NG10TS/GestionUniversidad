import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PagopendientesService } from 'src/app/core/services/ACADEMICO/administrativos/Pagopendientes.service';

@Component({
  selector: 'app-pagopendientes',
  templateUrl: './pagopendientes.component.html',
  styleUrls: ['./pagopendientes.component.css']
})
export class PagopendientesComponent implements OnInit {

  constructor(protected  _tipopago: PagopendientesService) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    //this.CargarPagopendientes();  
    //this.CargarOTROPagopendientes();    
  }
//CRUD V3: idPK=> id_tipo_pago_pend, nomService=> _tipopago, nombreCRUD=> Pagopendientes,  dataP=> tipopago, isSubmitted=>isSubmitted
  tipopago=[];
  isSubmitted = false;
  newPagopendientes =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_tipo_pago_pend:new FormControl(0),
    nombre_pago_pend:new FormControl(''),
    monto_pago_pend:new FormControl(''),
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
  resetPagopendientes(){
    this.newPagopendientes.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPagopendientes(){
    this.isSubmitted=true;
    if (this.newPagopendientes.invalid) {
      return;
    } else {
      let id = this.newPagopendientes.controls.id_tipo_pago_pend.value;
      console.log(this.newPagopendientes.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._tipopago.AgregarPagopendientes(this.newPagopendientes.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Pagopendientes',res.data);
          this.CargarPagopendientes();
          this.resetPagopendientes();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Pagopendientes');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._tipopago.ModificarPagopendientes(this.newPagopendientes.value,this.newPagopendientes.value.id_tipo_pago_pend)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Pagopendientes',res.data);
          this.CargarPagopendientes();
          this.resetPagopendientes();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Pagopendientes');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPagopendientes(id){
    if(id){
      const dataPagopendientes = this.tipopago.find(x => x.id_tipo_pago_pend === id)
      if(!dataPagopendientes) return;
      this._tipopago.SeleccionarPagopendientes(id)
      .then(res=>{
        Object.keys(this.newPagopendientes.controls).forEach(key => {
          this.newPagopendientes.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Pagopendientes EXITOSA',this.newPagopendientes.value);
          document.getElementById("btnCrudPagopendientes").click();
      });
    }
  }
  EliminarPagopendientes(id){
    this._tipopago.EliminarPagopendientes(id)
    .then(res => {
      console.log(res.data);
      this.CargarPagopendientes();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Pagopendientes',err.response.data.message);
    });
}
}
