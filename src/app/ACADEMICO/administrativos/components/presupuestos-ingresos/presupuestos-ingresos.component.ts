import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IngresoOperativosService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/ingreso-operativos.service';
import { PresupuestosIngresosService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/presupuestos-ingresos.service';

@Component({
  selector: 'app-presupuestos-ingresos',
  templateUrl: './presupuestos-ingresos.component.html',
  styleUrls: ['./presupuestos-ingresos.component.css']
})
export class PresupuestosIngresosComponent implements OnInit {

  constructor(protected _presupuestosingreso:PresupuestosIngresosService,
    protected _ingresoOperativo:IngresoOperativosService

) { }

  ngOnInit(): void {
    this.CargarPresupuestosIngreso()
    this.CargarIngresoOperativo()
  }
  

  //#region CRUD PRINCIPAL PRESUPUESTOS INGRESOS
  //CRUD V3: idPK=> id_presu_ingre, nomService=> _presupuestosingreso, nombreCRUD=> PresupuestosIngreso,  dataP=> presupuestoIngreso, isSubmitted=>isSubmitted
    presupuestoIngreso=[];
    isSubmitted = false;
    newPresupuestosIngreso =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_presu_ingre:new FormControl(0),
      id_ingreso_oper:new FormControl(''),
      monto_presu:new FormControl(''),
      monto_ejecutado:new FormControl(''),
      mes_presu:new FormControl(''),
    })
    CargarPresupuestosIngreso(){
      this._presupuestosingreso.ObtenerPresupuestosIngresos()
      .then(res => {
        console.log('PresupuestosIngreso CARGADO',res.data);
        this.presupuestoIngreso = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR PresupuestosIngreso',err.response.data.message);
      });
    }
    resetPresupuestosIngreso(){
      this.newPresupuestosIngreso.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPresupuestosIngreso(){
      this.isSubmitted=true;
      if (this.newPresupuestosIngreso.invalid) {
        return;
      } else {
        let id = this.newPresupuestosIngreso.controls.id_presu_ingre.value;
        console.log(this.newPresupuestosIngreso.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._presupuestosingreso.AgregarPresupuestosIngreso(this.newPresupuestosIngreso.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE PresupuestosIngreso',res.data);
            this.CargarPresupuestosIngreso();
            this.resetPresupuestosIngreso();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR PresupuestosIngreso');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._presupuestosingreso.ModificarPresupuestosIngreso(this.newPresupuestosIngreso.value,this.newPresupuestosIngreso.value.id_presu_ingre)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE PresupuestosIngreso',res.data);
            this.CargarPresupuestosIngreso();
            this.resetPresupuestosIngreso();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR PresupuestosIngreso');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPresupuestosIngreso(id){
      if(id){
        const dataPresupuestosIngreso = this.presupuestoIngreso.find(x => x.id_presu_ingre === id)
        if(!dataPresupuestosIngreso) return;
        this._presupuestosingreso.SeleccionarPresupuestosIngreso(id)
        .then(res=>{
          Object.keys(this.newPresupuestosIngreso.controls).forEach(key => {
            this.newPresupuestosIngreso.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE PresupuestosIngreso EXITOSA',this.newPresupuestosIngreso.value);
            document.getElementById("btnCrudPresupuestosIngreso").click();
        });
      }
    }
    EliminarPresupuestosIngreso(id){
      this._presupuestosingreso.EliminarPresupuestosIngreso(id)
      .then(res => {
        console.log(res.data);
        this.CargarPresupuestosIngreso();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR PresupuestosIngreso',err.response.data.message);
      });
  }
  //#endregion CRUD PRINCIPAL PRESUPUESTOS INGRESOS

  //#region INGRESO OPERATIVOS
//CRUD V3: idPK=> id_ingreso_oper, nomService=> _ingresoOperativo, nombreCRUD=> IngresoOperativo,  dataP=> ingresoOperativo, isSubmitted=>isSubmitted
ShowAddIngresoOperativo;
  ingresoOperativo=[];
  newIngresoOperativo =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ingreso_oper:new FormControl(0),
    id_plan_pago_proyec:new FormControl(''),
    nombre_plan_proyec:new FormControl(''),
  })
  CargarIngresoOperativo(){
    this._ingresoOperativo.ObtenerIngresoOperativos()
    .then(res => {
      console.log('IngresoOperativo CARGADO',res.data);
      this.ingresoOperativo = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR IngresoOperativo',err.response.data.message);
    });
  }
  resetIngresoOperativo(){
    this.newIngresoOperativo.reset();
    this.isSubmitted =false;
  }
  AgregarModificarIngresoOperativo(){
    this.isSubmitted=true;
    if (this.newIngresoOperativo.invalid) {
      return;
    } else {
      let id = this.newIngresoOperativo.controls.id_ingreso_oper.value;
      console.log(this.newIngresoOperativo.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._ingresoOperativo.AgregarIngresoOperativo(this.newIngresoOperativo.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE IngresoOperativo',res.data);
          this.CargarIngresoOperativo();
          this.resetIngresoOperativo();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR IngresoOperativo');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._ingresoOperativo.ModificarIngresoOperativo(this.newIngresoOperativo.value,this.newIngresoOperativo.value.id_ingreso_oper)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE IngresoOperativo',res.data);
          this.CargarIngresoOperativo();
          this.resetIngresoOperativo();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR IngresoOperativo');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarIngresoOperativo(id){
    if(id){
      const dataIngresoOperativo = this.ingresoOperativo.find(x => x.id_ingreso_oper === id)
      if(!dataIngresoOperativo) return;
      this._ingresoOperativo.SeleccionarIngresoOperativo(id)
      .then(res=>{
        Object.keys(this.newIngresoOperativo.controls).forEach(key => {
          this.newIngresoOperativo.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE IngresoOperativo EXITOSA',this.newIngresoOperativo.value);
          document.getElementById("btnCrudIngresoOperativo").click();
      });
    }
  }
  EliminarIngresoOperativo(id){
    this._ingresoOperativo.EliminarIngresoOperativo(id)
    .then(res => {
      console.log(res.data);
      this.CargarIngresoOperativo();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR IngresoOperativo',err.response.data.message);
    });
}
  //#endregion INGRESO OPERATIVOS
}
