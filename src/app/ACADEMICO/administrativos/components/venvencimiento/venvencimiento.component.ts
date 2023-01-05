import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VendetalleService } from 'src/app/core/services/ACADEMICO/administrativos/Vendetalle.service';
import { VenvencimientoService } from 'src/app/core/services/ACADEMICO/administrativos/Venvencimiento.service';

@Component({
  selector: 'app-venvencimiento',
  templateUrl: './venvencimiento.component.html',
  styleUrls: ['./venvencimiento.component.css']
})
export class VenvencimientoComponent implements OnInit {

  constructor(protected  _venven: VenvencimientoService, protected _vendet: VendetalleService) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarVenvencimiento();  
    this.CargarVendetalle();    
  }
vendet=[];
//CRUD V3: idPK=> id_ven_vencimiento, nomService=> _venven, nombreCRUD=> Venvencimiento,  dataP=> venven, isSubmitted=>isSubmitted
  venven=[];
  isSubmitted = false;
  newVenvencimiento =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ven_vencimiento:new FormControl(0),
    id_ven_detalle:new FormControl(''),
    desc_ven:new FormControl(''),
    periodo_ven:new FormControl(''),
    gestion_ven:new FormControl(''),
    tipo_ven:new FormControl(''),
  })
  CargarVenvencimiento(){
    this._venven.ObtenerVenvencimiento()
    .then(res => {
      console.log('Venvencimiento CARGADO',res.data);
      this.venven = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Venvencimiento',err.response.data.message);
    });
  }
  CargarVendetalle(){
    this._vendet.ObtenerVendetalle()
    .then(res => {
      console.log('Vendetalle CARGADO',res.data);
      this.vendet = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Vendetalle',err.response.data.message);
    });
  }
  resetVenvencimiento(){
    this.newVenvencimiento.reset();
    this.isSubmitted =false;
  }
  AgregarModificarVenvencimiento(){
    this.isSubmitted=true;
    if (this.newVenvencimiento.invalid) {
      return;
    } else {
      let id = this.newVenvencimiento.controls.id_ven_vencimiento.value;
      console.log(this.newVenvencimiento.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._venven.AgregarVenvencimiento(this.newVenvencimiento.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Venvencimiento',res.data);
          this.CargarVenvencimiento();
          this.resetVenvencimiento();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Venvencimiento');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._venven.ModificarVenvencimiento(this.newVenvencimiento.value,this.newVenvencimiento.value.id_ven_vencimiento)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Venvencimiento',res.data);
          this.CargarVenvencimiento();
          this.resetVenvencimiento();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Venvencimiento');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarVenvencimiento(id){
    if(id){
      const dataVenvencimiento = this.venven.find(x => x.id_ven_vencimiento === id)
      if(!dataVenvencimiento) return;
      this._venven.SeleccionarVenvencimiento(id)
      .then(res=>{
        Object.keys(this.newVenvencimiento.controls).forEach(key => {
          this.newVenvencimiento.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Venvencimiento EXITOSA',this.newVenvencimiento.value);
          document.getElementById("btnCrudVenvencimiento").click();
      });
    }
  }
  EliminarVenvencimiento(id){
    this._venven.EliminarVenvencimiento(id)
    .then(res => {
      console.log(res.data);
      this.CargarVenvencimiento();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Venvencimiento',err.response.data.message);
    });
}
}
