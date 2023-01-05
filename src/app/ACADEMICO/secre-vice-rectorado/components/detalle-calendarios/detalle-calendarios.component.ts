import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalendariosService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/Calendarios.service';
import { DetalleCalendariosService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/DetalleCalendarios.service';

@Component({
  selector: 'app-detalle-calendarios',
  templateUrl: './detalle-calendarios.component.html',
  styleUrls: ['./detalle-calendarios.component.css']
})
export class DetalleCalendariosComponent implements OnInit {

  constructor(protected _det_cal:DetalleCalendariosService, protected _calend:CalendariosService) { }

  ngOnInit(): void {
    this.CargarCalendarios();
    this.CargarDetalleCalendarios();
  }
//CRUD V3: idPK=> id_det_cal, nomService=> _det_cal, nombreCRUD=> DetalleCalendarios,  dataP=> detcal, isSubmitted=>isSubmitted
  detcal=[];
  calend=[];
  isSubmitted = false;

  newDetalleCalendarios =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_det_cal:new FormControl(0),
    id_calend:new FormControl(''),
    turno_det:new FormControl(''),
    paralelo_det:new FormControl(''),
    aula_det:new FormControl(''),
    id_tipo_cal:new FormControl(''),
  })
  CargarCalendarios(){
    this._calend.ObtenerCalendarios()
    .then(res => {
      console.log(res.data);
      this.calend = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarDetalleCalendarios(){
    this._det_cal.ObtenerDetalleCalendarios()
    .then(res => {
      console.log(res.data);
      this.detcal = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetDetalleCalendarios(){
    this.newDetalleCalendarios.reset();
    this.isSubmitted =false;
  }
  AgregarModificarDetalleCalendarios(){
    this.isSubmitted=true;
    if (this.newDetalleCalendarios.invalid) {
      return;
    } else {
      let id = this.newDetalleCalendarios.controls.id_det_cal.value;
      console.log(this.newDetalleCalendarios.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._det_cal.AgregarDetalleCalendarios(this.newDetalleCalendarios.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarDetalleCalendarios();
          this.resetDetalleCalendarios();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR DetalleCalendarios');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._det_cal.ModificarDetalleCalendarios(this.newDetalleCalendarios.value,this.newDetalleCalendarios.value.id_det_cal)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarDetalleCalendarios();
          this.resetDetalleCalendarios();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarDetalleCalendarios(id){
    if(id){
      const dataDetalleCalendarios = this.detcal.find(x => x.id_det_cal === id)
      if(!dataDetalleCalendarios) return;
      this._det_cal.SeleccionarDetalleCalendarios(id)
      .then(res=>{
        Object.keys(this.newDetalleCalendarios.controls).forEach(key => {
          this.newDetalleCalendarios.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newDetalleCalendarios.value);
          document.getElementById("btnCrudDetalleCalendarios").click();
      });
    }
  }
  EliminarDetalleCalendarios(id){
    this._det_cal.EliminarDetalleCalendarios(id)
    .then(res => {
      console.log(res.data);
      this.CargarDetalleCalendarios();
    }).catch(err =>  {
    console.log("err",err);
    });
}
}
