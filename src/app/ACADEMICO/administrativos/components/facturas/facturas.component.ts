import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FacturasService } from 'src/app/core/services/ACADEMICO/administrativos/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  constructor(protected _fac: FacturasService,) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarFacturas();
  }
//CRUD V3: idPK=> id_factura, nomService=> _fac, nombreCRUD=> Facturas,  dataP=> factu, isSubmitted=>isSubmitted
  factu=[];
  isSubmitted = false;
  newFacturas =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_factura:new FormControl(0),
    nro_factura:new FormControl(''),
    fec_factura:new FormControl(''),
    nit_factura:new FormControl(''),
    nombre_factura:new FormControl(''),
    monto_factura:new FormControl(''),
    detalle_factura :new FormControl(''),
    aut_factura :new FormControl(''),
    imag_factura :new FormControl(''),
  })
  CargarFacturas(){
    this._fac.ObtenerFacturas()
    .then(res => {
      console.log(res.data);
      this.factu = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetFacturas(){
    this.newFacturas.reset();
    this.isSubmitted =false;
  }
  AgregarModificarFacturas(){
    this.isSubmitted=true;
    if (this.newFacturas.invalid) {
      return;
    } else {
      let id = this.newFacturas.controls.id_factura.value;
      console.log(this.newFacturas.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._fac.AgregarFacturas(this.newFacturas.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarFacturas();
          this.resetFacturas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Facturas');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._fac.ModificarFacturas(this.newFacturas.value,this.newFacturas.value.id_factura)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarFacturas();
          this.resetFacturas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarFacturas(id){
    if(id){
      const dataFacturas = this.factu.find(x => x.id_factura === id)
      if(!dataFacturas) return;
      this._fac.SeleccionarFacturas(id)
      .then(res=>{
        Object.keys(this.newFacturas.controls).forEach(key => {
          this.newFacturas.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newFacturas.value);
          document.getElementById("btnCrudFacturas").click();
      });
    }
  }
  EliminarFacturas(id){
    this._fac.EliminarFacturas(id)
    .then(res => {
      console.log(res.data);
      this.CargarFacturas();
    }).catch(err =>  {
    console.log("err",err);
    });
}
}
