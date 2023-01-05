import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlanpagoService } from 'src/app/core/services/ACADEMICO/administrativos/Planpago.service';

@Component({
  selector: 'app-planpago',
  templateUrl: './planpago.component.html',
  styleUrls: ['./planpago.component.css']
})
export class PlanpagoComponent implements OnInit {

    constructor(protected  _ret: PlanpagoService,) { }

    ruta = 'http://localhost:8000/';
    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarPlanpago();  
      //this.CargarOTROPlanpago();    
    }
  //CRUD V3: idPK=> id_plan_pago, nomService=> _ret, nombreCRUD=> Planpago,  dataP=> ret, isSubmitted=>isSubmitted
    ret=[];
    isSubmitted = false;
    newPlanpago =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_plan_pago:new FormControl(0),
      tipo_plan_pago:new FormControl(''),
      monto:new FormControl(''),
    })
    CargarPlanpago(){
      this._ret.ObtenerPlanpago()
      .then(res => {
        console.log('Planpago CARGADO',res.data);
        this.ret = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Planpago',err.response.data.message);
      });
    }
    resetPlanpago(){
      this.newPlanpago.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPlanpago(){
      this.isSubmitted=true;
      if (this.newPlanpago.invalid) {
        return;
      } else {
        let id = this.newPlanpago.controls.id_plan_pago.value;
        console.log(this.newPlanpago.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._ret.AgregarPlanpago(this.newPlanpago.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Planpago',res.data);
            this.CargarPlanpago();
            this.resetPlanpago();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Planpago');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._ret.ModificarPlanpago(this.newPlanpago.value,this.newPlanpago.value.id_plan_pago)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Planpago',res.data);
            this.CargarPlanpago();
            this.resetPlanpago();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Planpago');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPlanpago(id){
      if(id){
        const dataPlanpago = this.ret.find(x => x.id_plan_pago === id)
        if(!dataPlanpago) return;
        this._ret.SeleccionarPlanpago(id)
        .then(res=>{
          Object.keys(this.newPlanpago.controls).forEach(key => {
            this.newPlanpago.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Planpago EXITOSA',this.newPlanpago.value);
            document.getElementById("btnCrudPlanpago").click();
        });
      }
    }
    EliminarPlanpago(id){
      this._ret.EliminarPlanpago(id)
      .then(res => {
        console.log(res.data);
        this.CargarPlanpago();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Planpago',err.response.data.message);
      });
  }
  }
  
