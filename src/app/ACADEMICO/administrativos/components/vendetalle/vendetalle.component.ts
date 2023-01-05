import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VendetalleService } from 'src/app/core/services/ACADEMICO/administrativos/Vendetalle.service';

@Component({
  selector: 'app-vendetalle',
  templateUrl: './vendetalle.component.html',
  styleUrls: ['./vendetalle.component.css']
})
export class VendetalleComponent implements OnInit {

  constructor(protected  _vendet: VendetalleService,) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarVendetalle();      
  }
//CRUD V3: idPK=> id_ven_detalle, nomService=> _vendet, nombreCRUD=> Vendetalle,  dataP=> vendet, isSubmitted=>isSubmitted
  vendet=[];
  isSubmitted = false;
  newVendetalle =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ven_detalle:new FormControl(0),
    fec_materia:new FormControl(''),
    fec_c1:new FormControl(''),
    fec_c2:new FormControl(''),
    fec_c3:new FormControl(''),
    fec_c4:new FormControl(''),
    fec_c5:new FormControl(''),
    fec_c6:new FormControl(''),

  })
  CargarVendetalle(){
    this._vendet.ObtenerVendetalle()
    .then(res => {
      console.log('Vendetalle CARGADO',res.data);
      this.vendet = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Vendetalle',err.response.data.message);
    });
  }
  resetVendetalle(){
    this.newVendetalle.reset();
    this.isSubmitted =false;
  }
  AgregarModificarVendetalle(){
    this.isSubmitted=true;
    if (this.newVendetalle.invalid) {
      return;
    } else {
      let id = this.newVendetalle.controls.id_ven_detalle.value;
      console.log(this.newVendetalle.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._vendet.AgregarVendetalle(this.newVendetalle.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Vendetalle',res.data);
          this.CargarVendetalle();
          this.resetVendetalle();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Vendetalle');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._vendet.ModificarVendetalle(this.newVendetalle.value,this.newVendetalle.value.id_ven_detalle)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Vendetalle',res.data);
          this.CargarVendetalle();
          this.resetVendetalle();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Vendetalle');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarVendetalle(id){
    if(id){
      const dataVendetalle = this.vendet.find(x => x.id_ven_detalle === id)
      if(!dataVendetalle) return;
      this._vendet.SeleccionarVendetalle(id)
      .then(res=>{
        Object.keys(this.newVendetalle.controls).forEach(key => {
          this.newVendetalle.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Vendetalle EXITOSA',this.newVendetalle.value);
          document.getElementById("btnCrudVendetalle").click();
      });
    }
  }
  EliminarVendetalle(id){
    this._vendet.EliminarVendetalle(id)
    .then(res => {
      console.log(res.data);
      this.CargarVendetalle();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Vendetalle',err.response.data.message);
    });
}
}
